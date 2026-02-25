import { Schema, model, models, Document, Types } from "mongoose";

export type AttemptStatus = "in_progress" | "submitted" | "auto_submitted";

export interface TestAttemptDocument extends Document {
  testTemplateId: Types.ObjectId;
  userId: string;
  startedAt: Date;
  submittedAt?: Date;
  durationSeconds?: number;
  status: AttemptStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TestAttemptSchema = new Schema<TestAttemptDocument>(
  {
    testTemplateId: {
      type: Schema.Types.ObjectId,
      ref: "TestTemplate",
      required: true
    },
    userId: { type: String, required: true },
    startedAt: { type: Date, required: true },
    submittedAt: Date,
    durationSeconds: Number,
    status: {
      type: String,
      enum: ["in_progress", "submitted", "auto_submitted"],
      default: "in_progress"
    }
  },
  { timestamps: true }
);

TestAttemptSchema.index({ testTemplateId: 1, userId: 1, status: 1 });

export const TestAttempt =
  (models.TestAttempt as ReturnType<typeof model<TestAttemptDocument>>) ||
  model<TestAttemptDocument>("TestAttempt", TestAttemptSchema);

