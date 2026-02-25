import { Schema, model, models, Document, Types } from "mongoose";

export interface SectionDocument extends Document {
  examId: Types.ObjectId;
  name: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SectionSchema = new Schema<SectionDocument>(
  {
    examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
    name: { type: String, required: true },
    order: { type: Number, required: true }
  },
  { timestamps: true }
);

SectionSchema.index({ examId: 1, order: 1 });

export const Section =
  (models.Section as ReturnType<typeof model<SectionDocument>>) ||
  model<SectionDocument>("Section", SectionSchema);

