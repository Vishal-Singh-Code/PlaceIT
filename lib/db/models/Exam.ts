import { Schema, model, models, Document } from "mongoose";

export interface ExamDocument extends Document {
  company: string;
  title: string;
  description?: string;
  isActive: boolean;
  branding?: {
    primaryColor?: string;
    logoUrl?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ExamSchema = new Schema<ExamDocument>(
  {
    company: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    branding: {
      primaryColor: String,
      logoUrl: String
    }
  },
  { timestamps: true }
);

export const Exam =
  (models.Exam as ReturnType<typeof model<ExamDocument>>) ||
  model<ExamDocument>("Exam", ExamSchema);

