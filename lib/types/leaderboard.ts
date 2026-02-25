export interface LeaderboardEntry {
  attemptId: string;
  userId: string;
  score: number;
  durationSeconds: number | null;
  startedAt: string;
  rank: number;
}

