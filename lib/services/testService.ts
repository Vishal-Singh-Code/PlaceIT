import { Types } from "mongoose";
import { connectToDatabase } from "../db/connection";
import { TestTemplate } from "../db/models/TestTemplate";
import { TestAttempt } from "../db/models/TestAttempt";
import { Question } from "../db/models/Question";
import { QuestionResponse } from "../db/models/QuestionResponse";
import { computeAttemptAnalytics } from "./analyticsService";
import { computeRankAndPercentile } from "./rankingService";
import {
  FinalSubmitInput,
  StartTestInput,
  SubmitAnswerInput
} from "../validation/testSchemas";

export async function startAttempt(input: StartTestInput) {
  await connectToDatabase();

  const { testTemplateId, userId } = input;
  const template = await TestTemplate.findById(testTemplateId);
  if (!template) {
    throw new Error("Test template not found");
  }

  const questionSelections: { questionId: Types.ObjectId; sectionId: Types.ObjectId }[] =
    [];

  for (const cfg of template.sectionConfig.sort((a, b) => a.order - b.order)) {
    const questions = await Question.find({
      examId: template.examId,
      sectionId: cfg.sectionId
    })
      .sort({ _id: 1 })
      .limit(cfg.numberOfQuestions);

    for (const q of questions) {
      questionSelections.push({ questionId: q._id, sectionId: cfg.sectionId });
    }
  }

  const now = new Date();

  const attempt = await TestAttempt.create({
    testTemplateId: template._id,
    userId,
    startedAt: now,
    status: "in_progress"
  });

  await QuestionResponse.insertMany(
    questionSelections.map((item) => ({
      attemptId: attempt._id,
      questionId: item.questionId,
      sectionId: item.sectionId,
      selectedOptionIndex: null,
      isCorrect: null,
      timeSpentSeconds: 0
    }))
  );

  const populatedResponses = await QuestionResponse.find({
    attemptId: attempt._id
  });

  return { attempt, responses: populatedResponses, template };
}

export async function recordAnswer(input: SubmitAnswerInput) {
  await connectToDatabase();

  const { attemptId, questionId, sectionId, selectedOptionIndex, timeSpentSeconds } =
    input;

  const attempt = await TestAttempt.findById(attemptId);
  if (!attempt) {
    throw new Error("Attempt not found");
  }
  if (attempt.status !== "in_progress") {
    throw new Error("Attempt is not in progress");
  }

  const question = await Question.findById(questionId);
  if (!question) {
    throw new Error("Question not found");
  }

  const isCorrect =
    selectedOptionIndex === null
      ? null
      : selectedOptionIndex === question.correctOptionIndex;

  const response = await QuestionResponse.findOneAndUpdate(
    { attemptId, questionId },
    {
      sectionId: sectionId,
      selectedOptionIndex,
      isCorrect,
      $inc: { timeSpentSeconds }
    },
    { new: true, upsert: true }
  );

  return response;
}

export async function finalizeAttempt(input: FinalSubmitInput) {
  await connectToDatabase();

  const { attemptId, mode } = input;

  const attempt = await TestAttempt.findById(attemptId);
  if (!attempt) {
    throw new Error("Attempt not found");
  }

  if (attempt.status !== "in_progress") {
    return attempt;
  }

  const submittedAt = new Date();
  const durationSeconds = Math.max(
    0,
    Math.round((submittedAt.getTime() - attempt.startedAt.getTime()) / 1000)
  );

  attempt.status = mode === "auto" ? "auto_submitted" : "submitted";
  attempt.submittedAt = submittedAt;
  attempt.durationSeconds = durationSeconds;
  await attempt.save();

  const analytics = await computeAttemptAnalytics(attempt._id.toString());
  const ranking = await computeRankAndPercentile(
    attempt.testTemplateId.toString(),
    attempt._id.toString()
  );

  return { attempt, analytics, ranking };
}

