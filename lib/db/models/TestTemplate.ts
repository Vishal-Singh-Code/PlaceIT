import { Schema, model, models, Document, Types } from "mongoose";

export interface SectionConfig {
  sectionId: Types.ObjectId;
  numberOfQuestions: number;
  order: number;
}

export interface TestTemplateDocument extends Document {
  examId: Types.ObjectId;
  name: string;
  durationMinutes: number;
  sectionConfig: SectionConfig[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SectionConfigSchema = new Schema<SectionConfig>(
  {
    sectionId: { type: Schema.Types.ObjectId, ref: "Section", required: true },
    numberOfQuestions: { type: Number, required: true },
    order: { type: Number, required: true }
  },
  { _id: false }
);

const TestTemplateSchema = new Schema<TestTemplateDocument>(
  {
    examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
    name: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    sectionConfig: { type: [SectionConfigSchema], required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

TestTemplateSchema.index({ examId: 1, isActive: 1 });

export const TestTemplate =
  (models.TestTemplate as ReturnType<typeof model<TestTemplateDocument>>) ||
  model<TestTemplateDocument>("TestTemplate", TestTemplateSchema);

