import { Schema, model, models, Document, Types } from "mongoose";

export interface SectionStats {
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

export interface AttemptAnalyticsDocument extends Document {
  attemptId: Types.ObjectId;
  testTemplateId: Types.ObjectId;
  userId: string;
  overallScore: number;
  totalQuestions: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalUnattempted: number;
  accuracy: number;
  sectionStats: SectionStats[];
  percentile?: number;
  rank?: number;
  createdAt: Date;
  updatedAt: Date;
}

const SectionStatsSchema = new Schema<SectionStats>(
  {
    sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    totalQuestions: { type: Number, required: true },
    correct: { type: Number, required: true },
    incorrect: { type: Number, required: true },
    unattempted: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    totalTimeSeconds: { type: Number, required: true },
    avgTimePerQuestionSeconds: { type: Number, required: true },
    strengthLabel: String
  },
  { _id: false }
);

const AttemptAnalyticsSchema = new Schema<AttemptAnalyticsDocument>(
  {
    attemptId: {
      type: Schema.Types.ObjectId,
      ref: "TestAttempt",
      required: true,
      unique: true
    },
    testTemplateId: {
      type: Schema.Types.ObjectId,
      ref: "TestTemplate",
      required: true
    },
    userId: { type: String, required: true },
    overallScore: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    totalCorrect: { type: Number, required: true },
    totalIncorrect: { type: Number, required: true },
    totalUnattempted: { type: Number, required: true },
    accuracy: { type: Number, required: true },
    sectionStats: { type: [SectionStatsSchema], required: true },
    percentile: Number,
    rank: Number
  },
  { timestamps: true }
);

AttemptAnalyticsSchema.index({ testTemplateId: 1, userId: 1 });

export const AttemptAnalytics =
  (models.AttemptAnalytics as ReturnType<
    typeof model<AttemptAnalyticsDocument>
  >) ||
  model<AttemptAnalyticsDocument>("AttemptAnalytics", AttemptAnalyticsSchema);

