import { TestRunnerClient } from "../../../components/TestRunnerClient";
import { getTestAttemptView } from "../../../lib/actions/tests";

interface Props {
  params: Promise<{ attemptId: string }>;
}

export default async function AttemptPage(props: Props) {
  const params = await props.params;

  const view = await getTestAttemptView(params.attemptId);

  if (!view.template) {
    return (
      <p className="text-sm text-red-400">
        Attempt or template data missing.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <div>
          <h2 className="text-lg font-semibold">Test in progress</h2>
          <p className="text-xs text-slate-400">
            {view.template.name}
          </p>
        </div>
      </div>
      <TestRunnerClient
        attemptId={view.attempt.id}
        status={view.attempt.status}
        startedAtIso={view.attempt.startedAt}
        durationMinutes={view.template.durationMinutes}
        items={view.items}
      />
    </div>
  );
}

