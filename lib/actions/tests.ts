"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  finalSubmitSchema,
  startTestSchema,
  submitAnswerSchema
} from "../validation/testSchemas";
import { startAttempt, recordAnswer, finalizeAttempt } from "../services/testService";
import { connectToDatabase } from "../db/connection";
import { TestAttempt } from "../db/models/TestAttempt";
import { QuestionResponse } from "../db/models/QuestionResponse";
import { Question } from "../db/models/Question";
import { TestTemplate } from "../db/models/TestTemplate";

async function getCurrentUserId() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("demo_user_id")?.value;
  if (existing) return existing;

  const generated = "demo-user";
  cookieStore.set("demo_user_id", generated, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });
  return generated;
}

export async function startTestAction(formData: FormData) {
  const userId = await getCurrentUserId();
  const raw = {
    testTemplateId: formData.get("testTemplateId"),
    userId
  };
  const parsed = startTestSchema.parse(raw);
  const result = await startAttempt(parsed);
  redirect(`/attempts/${result.attempt._id.toString()}`);
}

export async function submitAnswerAction(input: {
  attemptId: string;
  questionId: string;
  sectionId: string;
  selectedOptionIndex: number | null;
  timeSpentSeconds: number;
}) {
  const parsed = submitAnswerSchema.parse(input);
  await recordAnswer(parsed);
}

export async function finalSubmitAction(input: {
  attemptId: string;
  mode?: "manual" | "auto";
}) {
  const parsed = finalSubmitSchema.parse({
    attemptId: input.attemptId,
    mode: input.mode ?? "manual"
  });
  const result = await finalizeAttempt(parsed);
  if ("attempt" in result) {
    redirect(`/attempts/${result.attempt._id.toString()}/result`);
  } else {
    redirect(`/attempts/${result._id.toString()}/result`);
  }
}

export async function getTestAttemptView(attemptId: string) {
  await connectToDatabase();

  const attempt = await TestAttempt.findById(attemptId).lean();
  if (!attempt) {
    throw new Error("Attempt not found");
  }

  const template = await TestTemplate.findById(attempt.testTemplateId).lean();
  const responses = await QuestionResponse.find({ attemptId: attempt._id }).lean();

  const questions = await Question.find({
    _id: { $in: responses.map((r) => r.questionId) }
  }).lean();

  const questionsById = new Map(
    questions.map((q) => [q._id.toString(), q])
  );

  const items = responses.map((r) => {
    const q = questionsById.get(r.questionId.toString());
    if (!q) {
      throw new Error("Question not found for response");
    }
    return {
      questionId: q._id.toString(),
      sectionId: q.sectionId.toString(),
      text: q.text,
      options: q.options.map((opt: any) => ({
        label: opt.label,
        value: opt.value
      })),
      selectedOptionIndex: r.selectedOptionIndex
    };
  });

  return {
    attempt: {
      id: attempt._id.toString(),
      status: attempt.status,
      startedAt: attempt.startedAt.toISOString(),
      submittedAt: attempt.submittedAt?.toISOString() ?? null
    },
    template: template
      ? {
        id: template._id.toString(),
        name: template.name,
        durationMinutes: template.durationMinutes
      }
      : null,
    items
  };
}

