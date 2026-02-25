import Link from "next/link";
import { connectToDatabase } from "../../../../lib/db/connection";
import { AttemptAnalytics } from "../../../../lib/db/models/AttemptAnalytics";
import { TestAttempt } from "../../../../lib/db/models/TestAttempt";
import { Section } from "../../../../lib/db/models/Section";
import { Question } from "../../../../lib/db/models/Question";
import { QuestionResponse } from "../../../../lib/db/models/QuestionResponse";
import { getLeaderboard } from "../../../../lib/services/rankingService";

interface Props {
  params: Promise<{ attemptId: string }>;
}

export default async function AttemptResultPage(props: Props) {
  const params = await props.params;
  await connectToDatabase();

  const attempt = await TestAttempt.findById(params.attemptId).lean();
  if (!attempt) {
    return <p className="text-sm text-red-400">Attempt not found.</p>;
  }

  const analytics = await AttemptAnalytics.findOne({
    attemptId: attempt._id
  }).lean();

  if (!analytics) {
    return (
      <p className="text-sm text-slate-400">
        Analytics not computed yet for this attempt.
      </p>
    );
  }

  const sections = await Section.find({
    _id: { $in: analytics.sectionStats.map((s) => s.sectionId) }
  })
    .select({ _id: 1, name: 1 })
    .lean();

  const sectionNameById = new Map(
    sections.map((s) => [s._id.toString(), s.name as string])
  );

  const responses = await QuestionResponse.find({ attemptId: attempt._id }).lean();

  const reviewQuestions = await Question.find({
    _id: { $in: responses.map((r) => r.questionId) }
  }).lean();

  const reviewQuestionsById = new Map(
    reviewQuestions.map((q) => [q._id.toString(), q])
  );

  const reviewItems = responses.map((r) => {
    const q = reviewQuestionsById.get(r.questionId.toString());
    if (!q) return null;

    const selectedIndex = r.selectedOptionIndex;
    const correctIndex = q.correctOptionIndex;

    return {
      id: q._id.toString(),
      text: q.text as string,
      options: (q.options as { label: string; value: string }[]) ?? [],
      explanation: (q.explanation as string | undefined) ?? null,
      selectedOptionIndex: selectedIndex,
      correctOptionIndex: correctIndex,
      isCorrect:
        selectedIndex === null
          ? null
          : selectedIndex === correctIndex
    };
  }).filter(Boolean) as {
    id: string;
    text: string;
    options: { label: string; value: string }[];
    explanation: string | null;
    selectedOptionIndex: number | null;
    correctOptionIndex: number;
    isCorrect: boolean | null;
  }[];

  const leaderboard = await getLeaderboard(
    analytics.testTemplateId.toString(),
    10
  );

  const completionLabel =
    attempt.status === "auto_submitted" ? "Auto-submitted" : "Completed";

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Overall performance</h2>
            <p className="text-xs text-slate-400">
              Attempt ID {attempt._id.toString().slice(-6)}
            </p>
          </div>
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-medium text-slate-100">
            {completionLabel}
          </span>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-4 text-sm">
          <div>
            <p className="text-xs text-slate-400">Score</p>
            <p className="text-lg font-semibold text-sky-400">
              {analytics.overallScore} / {analytics.totalQuestions}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Accuracy</p>
            <p className="text-lg font-semibold text-emerald-400">
              {(analytics.accuracy * 100).toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Rank</p>
            <p className="text-lg font-semibold">
              {analytics.rank ? `#${analytics.rank}` : "-"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Percentile</p>
            <p className="text-lg font-semibold">
              {analytics.percentile
                ? `${analytics.percentile.toFixed(1)}%`
                : "-"}
            </p>
          </div>
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Percentile is computed as 100 × (1 − higherScoreCount / totalAttempts), where
          higherScoreCount is the number of attempts with a strictly higher score.
        </p>
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Question review</h3>
          <span className="text-[11px] text-slate-400">
            {reviewItems.length} questions
          </span>
        </div>
        <div className="space-y-3 text-xs">
          {reviewItems.map((item, idx) => {
            const selected = item.selectedOptionIndex;
            const correct = item.correctOptionIndex;

            let statusLabel = "Unattempted";
            let statusClass = "bg-slate-800 text-slate-300";
            if (selected !== null) {
              if (selected === correct) {
                statusLabel = "Correct";
                statusClass = "bg-emerald-500/20 text-emerald-300";
              } else {
                statusLabel = "Incorrect";
                statusClass = "bg-rose-500/20 text-rose-300";
              }
            }

            return (
              <div
                key={item.id}
                className="rounded border border-slate-800 bg-slate-900/60 p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-slate-200">
                    Q{idx + 1}. {item.text}
                  </p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] ${statusClass}`}>
                    {statusLabel}
                  </span>
                </div>
                <ul className="mb-2 space-y-1">
                  {item.options.map((opt, i) => {
                    const isSelected = selected === i;
                    const isCorrect = correct === i;
                    return (
                      <li
                        key={`${item.id}-${opt.label}`}
                        className={`flex items-center justify-between rounded px-2 py-1 ${
                          isCorrect
                            ? "bg-emerald-500/10 border border-emerald-500/40"
                            : isSelected
                            ? "bg-rose-500/10 border border-rose-500/40"
                            : "border border-slate-800"
                        }`}
                      >
                        <span>
                          <span className="mr-2 font-semibold text-sky-300">
                            {opt.label}.
                          </span>
                          {opt.value}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {isCorrect
                            ? "Correct"
                            : isSelected
                            ? "Your choice"
                            : ""}
                        </span>
                      </li>
                    );
                  })}
                </ul>
                {item.explanation && (
                  <p className="text-[11px] text-slate-300">
                    <span className="font-semibold text-slate-200">
                      Explanation:
                    </span>{" "}
                    {item.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
        <h3 className="mb-3 text-sm font-semibold">Section-wise breakdown</h3>
        <div className="grid gap-3 md:grid-cols-3 text-xs">
          {analytics.sectionStats.map((s) => {
            const name =
              sectionNameById.get(s.sectionId.toString()) ?? "Section";
            const accuracyPct = (s.accuracy * 100).toFixed(1);
            return (
              <div
                key={s.sectionId.toString()}
                className="space-y-2 rounded border border-slate-800 bg-slate-900/60 p-3"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-slate-200">{name}</p>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-300">
                    {s.totalQuestions} Qs
                  </span>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-slate-300">Accuracy</span>
                    <span className="font-semibold text-emerald-400">
                      {accuracyPct}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${Math.min(100, Number(accuracyPct))}%`
                      }}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="rounded bg-slate-800 px-2 py-1 text-center">
                    <p className="text-slate-400">Correct</p>
                    <p className="font-mono text-emerald-400">{s.correct}</p>
                  </div>
                  <div className="rounded bg-slate-800 px-2 py-1 text-center">
                    <p className="text-slate-400">Incorrect</p>
                    <p className="font-mono text-rose-400">{s.incorrect}</p>
                  </div>
                  <div className="rounded bg-slate-800 px-2 py-1 text-center">
                    <p className="text-slate-400">Unattempted</p>
                    <p className="font-mono text-amber-300">
                      {s.unattempted}
                    </p>
                  </div>
                </div>
                <div className="text-slate-300 text-[11px]">
                  Avg time/question:{" "}
                  <span className="font-mono">
                    {s.avgTimePerQuestionSeconds.toFixed(1)}s
                  </span>
                </div>
                {s.strengthLabel && (
                  <p className="text-[11px] text-sky-300">{s.strengthLabel}</p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="rounded-lg border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold">Leaderboard (top 10)</h3>
        </div>
        {leaderboard.length === 0 ? (
          <p className="text-xs text-slate-400">
            Not enough attempts yet to build a leaderboard.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-xs">
              <thead className="border-b border-slate-800 text-slate-400">
                <tr>
                  <th className="px-2 py-1">Rank</th>
                  <th className="px-2 py-1">User</th>
                  <th className="px-2 py-1">Score</th>
                  <th className="px-2 py-1">Duration</th>
                  <th className="px-2 py-1">Started</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => {
                  const isCurrent =
                    entry.attemptId === attempt._id.toString();
                  return (
                    <tr
                      key={entry.attemptId}
                      className={
                        isCurrent ? "bg-sky-500/10" : "border-b border-slate-900"
                      }
                    >
                      <td className="px-2 py-1 font-semibold">
                        #{entry.rank}
                      </td>
                      <td className="px-2 py-1">
                        {entry.userId}
                        {isCurrent && (
                          <span className="ml-1 rounded bg-sky-500/20 px-1 text-[10px] text-sky-300">
                            You
                          </span>
                        )}
                      </td>
                      <td className="px-2 py-1">
                        {entry.score}
                      </td>
                      <td className="px-2 py-1">
                        {entry.durationSeconds !== null
                          ? `${Math.round(
                              entry.durationSeconds / 60
                            )} min`
                          : "-"}
                      </td>
                      <td className="px-2 py-1 text-slate-400">
                        {new Date(entry.startedAt).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="text-xs">
        <Link href="/" className="text-sky-400 hover:text-sky-300">
          ← Back to exams
        </Link>
      </div>
    </div>
  );
}

