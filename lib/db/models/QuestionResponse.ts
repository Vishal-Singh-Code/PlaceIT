import { Schema, model, models, Document, Types } from "mongoose";

export interface QuestionResponseDocument extends Document {
  attemptId: Types.ObjectId;
  questionId: Types.ObjectId;
  sectionId: Types.ObjectId;
  selectedOptionIndex: number | null;
  isCorrect: boolean | null;
  timeSpentSeconds: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionResponseSchema = new Schema<QuestionResponseDocument>(
  {
    attemptId: {
      type: Schema.Types.ObjectId,
      ref: "TestAttempt",
      required: true
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
      required: true
    },
    sectionId: {
      type: Schema.Types.ObjectId,
      ref: "Section",
      required: true
    },
    selectedOptionIndex: { type: Number, default: null },
    isCorrect: { type: Boolean, default: null },
    timeSpentSeconds: { type: Number, default: 0 }
  },
  { timestamps: true }
);

QuestionResponseSchema.index({ attemptId: 1 });
QuestionResponseSchema.index({ attemptId: 1, questionId: 1 }, { unique: true });

export const QuestionResponse =
  (models.QuestionResponse as ReturnType<
    typeof model<QuestionResponseDocument>
  >) || model<QuestionResponseDocument>("QuestionResponse", QuestionResponseSchema);

