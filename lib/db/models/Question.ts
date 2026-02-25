import { Schema, model, models, Document, Types } from "mongoose";

export interface QuestionOption {
  label: string;
  value: string;
}

export interface QuestionDocument extends Document {
  examId: Types.ObjectId;
  sectionId: Types.ObjectId;
  text: string;
  options: QuestionOption[];
  correctOptionIndex: number;
  difficulty?: "easy" | "medium" | "hard";
  tags?: string[];
  explanation?: string;
  sourceYear?: number;
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<QuestionDocument>(
  {
    examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
    sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    text: { type: String, required: true },
    options: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true }
      }
    ],
    correctOptionIndex: { type: Number, required: true },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium"
    },
    tags: [String],
    explanation: String,
    sourceYear: Number
  },
  { timestamps: true }
);

QuestionSchema.index({ examId: 1, sectionId: 1 });

export const Question =
  (models.Question as ReturnType<typeof model<QuestionDocument>>) ||
  model<QuestionDocument>("Question", QuestionSchema);

