import Link from "next/link";
import { connectToDatabase } from "../../lib/db/connection";
import { Exam } from "../../lib/db/models/Exam";
import { TestTemplate } from "../../lib/db/models/TestTemplate";
import { Section } from "../../lib/db/models/Section";
import { Question } from "../../lib/db/models/Question";

export default async function AdminPage() {
  await connectToDatabase();

  const exams = await Exam.find({}).lean();
  const templates = await TestTemplate.find({}).lean();
  const sections = await Section.find({}).lean();
  const questions = await Question.find({}).lean();

  const templatesByExamId = new Map<string, any[]>();
  for (const tpl of templates) {
    const key = tpl.examId.toString();
    const list = templatesByExamId.get(key) ?? [];
    list.push(tpl);
    templatesByExamId.set(key, list);
  }

  const sectionsByExamId = new Map<string, any[]>();
  for (const s of sections) {
    const key = s.examId.toString();
    const list = sectionsByExamId.get(key) ?? [];
    list.push(s);
    sectionsByExamId.set(key, list);
  }

  const questionsByExamId = new Map<string, any[]>();
  for (const q of questions) {
    const key = q.examId.toString();
    const list = questionsByExamId.get(key) ?? [];
    list.push(q);
    questionsByExamId.set(key, list);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Admin overview</h2>
        <Link href="/" className="text-xs text-sky-400 hover:text-sky-300">
          ← Back to exams
        </Link>
      </div>
      <section className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-xs">
        <div className="grid gap-4 md:grid-cols-4">
          <div>
            <p className="text-slate-400">Exams</p>
            <p className="text-xl font-semibold text-sky-400">
              {exams.length}
            </p>
          </div>
          <div>
            <p className="text-slate-400">Test templates</p>
            <p className="text-xl font-semibold text-sky-400">
              {templates.length}
            </p>
          </div>
          <div>
            <p className="text-slate-400">Sections</p>
            <p className="text-xl font-semibold text-sky-400">
              {sections.length}
            </p>
          </div>
          <div>
            <p className="text-slate-400">Questions</p>
            <p className="text-xl font-semibold text-sky-400">
              {questions.length}
            </p>
          </div>
        </div>
      </section>
      <section className="rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-xs">
        <h3 className="mb-3 text-sm font-semibold">Exams & templates</h3>
        <div className="space-y-3">
          {exams.map((exam) => {
            const examId = exam._id.toString();
            const examTemplates = templatesByExamId.get(examId) ?? [];
            const examSections = sectionsByExamId.get(examId) ?? [];
            const examQuestions = questionsByExamId.get(examId) ?? [];
            return (
              <div
                key={examId}
                className="rounded border border-slate-800 bg-slate-900/60 p-3"
              >
                <div className="mb-1 flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-100">
                      {exam.title}
                    </p>
                    <p className="text-[11px] text-slate-400">{exam.company}</p>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    <span className="mr-2">
                      {examTemplates.length} templates
                    </span>
                    <span className="mr-2">
                      {examSections.length} sections
                    </span>
                    <span>{examQuestions.length} questions</span>
                  </div>
                </div>
                <div className="mt-2 space-y-1">
                  {examTemplates.map((tpl) => (
                    <div
                      key={tpl._id.toString()}
                      className="flex items-center justify-between rounded border border-slate-800 bg-slate-900/60 px-2 py-1"
                    >
                      <div>
                        <p className="text-slate-200 text-xs">{tpl.name}</p>
                        <p className="text-[11px] text-slate-500">
                          {tpl.durationMinutes} min •{" "}
                          {tpl.sectionConfig.reduce(
                            (sum: number, cfg: any) =>
                              sum + (cfg.numberOfQuestions ?? 0),
                            0
                          )}{" "}
                          questions
                        </p>
                      </div>
                      <Link
                        href={`/tests/${tpl._id.toString()}`}
                        className="text-[11px] text-sky-400 hover:text-sky-300"
                      >
                        Open test →
                      </Link>
                    </div>
                  ))}
                  {examTemplates.length === 0 && (
                    <p className="text-[11px] text-slate-500">
                      No templates configured for this exam yet.
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

