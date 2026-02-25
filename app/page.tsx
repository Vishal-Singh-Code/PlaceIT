import Link from "next/link";
import { connectToDatabase } from "../lib/db/connection";
import { Exam } from "../lib/db/models/Exam";
import { TestTemplate } from "../lib/db/models/TestTemplate";

export default async function HomePage() {
  await connectToDatabase();

  const exams = await Exam.find({ isActive: true }).lean();
  const templates = await TestTemplate.find({ isActive: true }).lean();

  const templatesByExamId = new Map<string, typeof templates>();
  for (const t of templates) {
    const key = t.examId.toString();
    const list = templatesByExamId.get(key) || [];
    list.push(t);
    templatesByExamId.set(key, list);
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold mb-2">Available Exams</h2>
        {exams.length === 0 ? (
          <p className="text-sm text-slate-400">
            No exams seeded yet. Add exams and test templates in the database to get started.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {exams.map((exam) => (
              <div
                key={exam._id.toString()}
                className="rounded-lg border border-slate-800 bg-slate-900/40 p-4"
              >
                <h3 className="font-semibold">{exam.title}</h3>
                <p className="text-xs text-slate-400 mb-2">
                  {exam.company}
                </p>
                {exam.description && (
                  <p className="text-sm text-slate-300 mb-3 line-clamp-3">
                    {exam.description}
                  </p>
                )}
                <div className="space-y-1">
                  {(templatesByExamId.get(exam._id.toString()) || []).map((tpl) => (
                    <Link
                      key={tpl._id.toString()}
                      href={`/tests/${tpl._id.toString()}`}
                      className="flex items-center justify-between rounded border border-slate-800 bg-slate-900/60 px-3 py-2 text-sm hover:border-sky-500 hover:bg-slate-900"
                    >
                      <span>{tpl.name}</span>
                      <span className="text-xs text-sky-400">
                        {tpl.durationMinutes} min
                      </span>
                    </Link>
                  ))}
                  {(templatesByExamId.get(exam._id.toString()) || []).length === 0 && (
                    <p className="text-xs text-slate-500">
                      No active test templates for this exam yet.
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

