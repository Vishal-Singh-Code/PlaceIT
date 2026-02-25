import { startTestAction } from "../../../lib/actions/tests";
import { connectToDatabase } from "../../../lib/db/connection";
import { TestTemplate } from "../../../lib/db/models/TestTemplate";
import { Exam } from "../../../lib/db/models/Exam";

interface Props {
  params: Promise<{ testTemplateId: string }>;
}

export default async function TestTemplatePage(props: Props) {
  const params = await props.params;

  await connectToDatabase();
  const template = await TestTemplate.findById(params.testTemplateId).lean();
  if (!template) {
    return <p className="text-sm text-red-400">Test template not found.</p>;
  }

  const exam = await Exam.findById(template.examId).lean();

  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-slate-400 mb-1">
          {exam ? exam.company : "Exam"}
        </p>
        <h2 className="text-xl font-semibold mb-1">{template.name}</h2>
        <p className="text-sm text-slate-300">
          Duration:{" "}
          <span className="text-sky-400">
            {template.durationMinutes} minutes
          </span>
        </p>
      </div>

      <form action={startTestAction} className="mt-4">
        <input type="hidden" name="testTemplateId" value={params.testTemplateId} />
        <button
          type="submit"
          className="rounded bg-sky-500 px-4 py-2 text-sm font-medium text-white hover:bg-sky-400"
        >
          Start Test
        </button>
      </form>
    </div>
  );
}

