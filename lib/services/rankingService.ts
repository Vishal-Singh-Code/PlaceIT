import { connectToDatabase } from "../db/connection";
import { AttemptAnalytics } from "../db/models/AttemptAnalytics";
import { TestAttempt } from "../db/models/TestAttempt";
import { LeaderboardEntry } from "../types/leaderboard";

interface ScoreRecord {
  attemptId: string;
  score: number;
  durationSeconds: number | null;
}

export function computeRankAndPercentileCore(
  scores: ScoreRecord[],
  targetAttemptId: string
) {
  const sorted = [...scores].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    const aDur = a.durationSeconds ?? Number.MAX_SAFE_INTEGER;
    const bDur = b.durationSeconds ?? Number.MAX_SAFE_INTEGER;
    return aDur - bDur;
  });

  const total = sorted.length;
  const index = sorted.findIndex((s) => s.attemptId === targetAttemptId);
  if (index === -1) {
    throw new Error("Target attempt not found in scores array");
  }

  const rank = index + 1;
  const higherScoreCount = sorted.filter(
    (s) => s.score > sorted[index].score
  ).length;

  /**
   * Percentile formula:
   * percentile = 100 * (1 - higherScoreCount / totalAttempts)
   *
   * Intuition:
   * - if no one scored higher, percentile = 100
   * - if everyone scored higher, percentile approaches 0
   */
  const percentile =
    total === 0 ? 0 : 100 * (1 - higherScoreCount / total || 0);

  return { rank, percentile };
}

export async function computeRankAndPercentile(
  testTemplateId: string,
  attemptId: string
) {
  await connectToDatabase();

  const [attempts, analytics] = await Promise.all([
    TestAttempt.find({
      testTemplateId,
      status: { $in: ["submitted", "auto_submitted"] }
    }).sort({ startedAt: 1 }),
    AttemptAnalytics.find({ testTemplateId })
  ]);

  const analyticsByAttempt = new Map(
    analytics.map((a) => [a.attemptId.toString(), a])
  );

  const scores: ScoreRecord[] = attempts.map((attempt) => {
    const analyticsDoc = analyticsByAttempt.get(attempt._id.toString());
    const score = analyticsDoc ? analyticsDoc.overallScore : 0;
    const durationSeconds =
      attempt.durationSeconds ??
      (attempt.submittedAt && attempt.startedAt
        ? Math.max(
            0,
            Math.round(
              (attempt.submittedAt.getTime() - attempt.startedAt.getTime()) /
                1000
            )
          )
        : null);

    return {
      attemptId: attempt._id.toString(),
      score,
      durationSeconds
    };
  });

  const { rank, percentile } = computeRankAndPercentileCore(scores, attemptId);

  const analyticsForAttempt = await AttemptAnalytics.findOne({
    attemptId
  });
  if (analyticsForAttempt) {
    analyticsForAttempt.rank = rank;
    analyticsForAttempt.percentile = percentile;
    await analyticsForAttempt.save();
  }

  return { rank, percentile };
}

export async function getLeaderboard(
  testTemplateId: string,
  limit = 10
): Promise<LeaderboardEntry[]> {
  await connectToDatabase();

  const analytics = await AttemptAnalytics.find({ testTemplateId })
    .sort({ overallScore: -1, createdAt: 1 })
    .limit(limit);

  const attempts = await TestAttempt.find({
    _id: { $in: analytics.map((a) => a.attemptId) }
  });
  const attemptsById = new Map(
    attempts.map((a) => [a._id.toString(), a])
  );

  const entries: LeaderboardEntry[] = analytics.map((a, idx) => {
    const attempt = attemptsById.get(a.attemptId.toString());
    return {
      attemptId: a.attemptId.toString(),
      userId: a.userId,
      score: a.overallScore,
      durationSeconds: attempt ? attempt.durationSeconds ?? null : null,
      startedAt: attempt ? attempt.startedAt.toISOString() : "",
      rank: idx + 1
    };
  });

  return entries;
}

