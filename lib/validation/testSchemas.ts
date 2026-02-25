import { z } from "zod";

export const startTestSchema = z.object({
  testTemplateId: z.string().min(1),
  userId: z.string().min(1)
});

export const submitAnswerSchema = z.object({
  attemptId: z.string().min(1),
  questionId: z.string().min(1),
  sectionId: z.string().min(1),
  selectedOptionIndex: z.number().int().nonnegative().nullable(),
  timeSpentSeconds: z.number().int().nonnegative()
});

export const finalSubmitSchema = z.object({
  attemptId: z.string().min(1),
  mode: z.enum(["manual", "auto"]).default("manual")
});

export type StartTestInput = z.infer<typeof startTestSchema>;
export type SubmitAnswerInput = z.infer<typeof submitAnswerSchema>;
export type FinalSubmitInput = z.infer<typeof finalSubmitSchema>;

