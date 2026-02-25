import { Types } from "mongoose";
import { AttemptAnalyticsCore, SectionAnalytics } from "../types/analytics";
import { Question, QuestionDocument } from "../db/models/Question";
import {
  QuestionResponse,
  QuestionResponseDocument
} from "../db/models/QuestionResponse";
import { Section, SectionDocument } from "../db/models/Section";
import { TestAttempt } from "../db/models/TestAttempt";
import { AttemptAnalytics } from "../db/models/AttemptAnalytics";
import { connectToDatabase } from "../db/connection";

interface ComputeCoreInput {
  attemptId: Types.ObjectId;
  testTemplateId: Types.ObjectId;
  userId: string;
  questions: QuestionDocument[];
  responses: QuestionResponseDocument[];
  sections: SectionDocument[];
}

export function computeAttemptAnalyticsCore(
  input: ComputeCoreInput
): AttemptAnalyticsCore {
  const { attemptId, testTemplateId, userId, questions, responses, sections } =
    input;

  const responsesByQuestion = new Map<string, QuestionResponseDocument>();
  for (const r of responses) {
    responsesByQuestion.set(r.questionId.toString(), r);
  }

  const sectionStatsMap = new Map<string, SectionAnalytics>();

  let totalCorrect = 0;
  let totalIncorrect = 0;
  let totalUnattempted = 0;
  let totalQuestions = questions.length;

  for (const question of questions) {
    const key = question._id.toString();
    const response = responsesByQuestion.get(key) || null;
    const sectionId = question.sectionId.toString();

    let sectionStats = sectionStatsMap.get(sectionId);
    if (!sectionStats) {
      sectionStats = {
        sectionId: question.sectionId,
        totalQuestions: 0,
        correct: 0,
        incorrect: 0,
        unattempted: 0,
        accuracy: 0,
        totalTimeSeconds: 0,
        avgTimePerQuestionSeconds: 0,
        strengthLabel: undefined
      };
      sectionStatsMap.set(sectionId, sectionStats);
    }

    sectionStats.totalQuestions += 1;

    const isAttempted =
      response && response.selectedOptionIndex !== null ? true : false;
    const isCorrect =
      isAttempted &&
      response!.selectedOptionIndex === question.correctOptionIndex;

    if (!isAttempted) {
      sectionStats.unattempted += 1;
      totalUnattempted += 1;
    } else if (isCorrect) {
      sectionStats.correct += 1;
      totalCorrect += 1;
    } else {
      sectionStats.incorrect += 1;
      totalIncorrect += 1;
    }

    if (response) {
      sectionStats.totalTimeSeconds += response.timeSpentSeconds;
    }
  }

  for (const section of sectionStatsMap.values()) {
    section.accuracy =
      section.totalQuestions === 0
        ? 0
        : section.correct / section.totalQuestions;
    section.avgTimePerQuestionSeconds =
      section.totalQuestions === 0
        ? 0
        : section.totalTimeSeconds / section.totalQuestions;

    if (section.accuracy >= 0.7) {
      section.strengthLabel = "Strong";
    } else if (section.accuracy >= 0.4) {
      section.strengthLabel = "Average";
    } else {
      section.strengthLabel = "Needs improvement";
    }
  }

  const accuracy = totalQuestions === 0 ? 0 : totalCorrect / totalQuestions;
  const overallScore = totalCorrect;

  return {
    attemptId,
    testTemplateId,
    userId,
    overallScore,
    totalQuestions,
    totalCorrect,
    totalIncorrect,
    totalUnattempted,
    accuracy,
    sectionStats: Array.from(sectionStatsMap.values())
  };
}

export async function computeAttemptAnalytics(attemptId: string) {
  await connectToDatabase();

  const attempt = await TestAttempt.findById(attemptId);
  if (!attempt) {
    throw new Error("Attempt not found");
  }

  const [questions, responses, sections] = await Promise.all([
    Question.find({}),
    QuestionResponse.find({ attemptId: attempt._id }),
    Section.find({})
  ]);

  const core = computeAttemptAnalyticsCore({
    attemptId: attempt._id,
    testTemplateId: attempt.testTemplateId,
    userId: attempt.userId,
    questions,
    responses,
    sections
  });

  const existing = await AttemptAnalytics.findOne({
    attemptId: attempt._id
  });

  if (existing) {
    existing.overallScore = core.overallScore;
    existing.totalQuestions = core.totalQuestions;
    existing.totalCorrect = core.totalCorrect;
    existing.totalIncorrect = core.totalIncorrect;
    existing.totalUnattempted = core.totalUnattempted;
    existing.accuracy = core.accuracy;
    existing.sectionStats = core.sectionStats;
    await existing.save();
    return existing;
  }

  const created = await AttemptAnalytics.create({
    attemptId: core.attemptId,
    testTemplateId: core.testTemplateId,
    userId: core.userId,
    overallScore: core.overallScore,
    totalQuestions: core.totalQuestions,
    totalCorrect: core.totalCorrect,
    totalIncorrect: core.totalIncorrect,
    totalUnattempted: core.totalUnattempted,
    accuracy: core.accuracy,
    sectionStats: core.sectionStats
  });

  return created;
}

