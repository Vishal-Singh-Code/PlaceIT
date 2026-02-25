import { Types } from "mongoose";

export interface SectionAnalytics {
  sectionId: Types.ObjectId;
  totalQuestions: number;
  correct: number;
  incorrect: number;
  unattempted: number;
  accuracy: number;
  totalTimeSeconds: number;
  avgTimePerQuestionSeconds: number;
  strengthLabel?: string;
}

export interface AttemptAnalyticsCore {
  attemptId: Types.ObjectId;
  testTemplateId: Types.ObjectId;
  userId: string;
  overallScore: number;
  totalQuestions: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalUnattempted: number;
  accuracy: number;
  sectionStats: SectionAnalytics[];
}

