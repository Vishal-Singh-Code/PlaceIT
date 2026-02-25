"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { submitAnswerAction, finalSubmitAction } from "../lib/actions/tests";
import { clsx } from "clsx";

export interface TestItem {
  questionId: string;
  sectionId: string;
  text: string;
  options: { label: string; value: string }[];
  selectedOptionIndex: number | null;
}

interface Props {
  attemptId: string;
  status: string;
  startedAtIso: string;
  durationMinutes: number;
  items: TestItem[];
}

export function TestRunnerClient({
  attemptId,
  status,
  startedAtIso,
  durationMinutes,
  items
}: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | null>>(() => {
    const init: Record<string, number | null> = {};
    for (const item of items) {
      init[item.questionId] =
        item.selectedOptionIndex === null ? null : item.selectedOptionIndex;
    }
    return init;
  });
  const [isPending, startTransition] = useTransition();
  const [remainingSeconds, setRemainingSeconds] = useState(() => {
    const started = new Date(startedAtIso).getTime();
    const end = started + durationMinutes * 60 * 1000;
    return Math.max(0, Math.round((end - Date.now()) / 1000));
  });
  const [autoSubmitted, setAutoSubmitted] = useState(false);
  const [marked, setMarked] = useState<Record<string, boolean>>({});

  const sections = useMemo(() => {
    const map = new Map<
      string,
      { id: string; questions: TestItem[] }
    >();
    for (const item of items) {
      const existing = map.get(item.sectionId) || {
        id: item.sectionId,
        questions: []
      };
      existing.questions.push(item);
      map.set(item.sectionId, existing);
    }
    return Array.from(map.values());
  }, [items]);

  useEffect(() => {
    if (status !== "in_progress") return;
    if (remainingSeconds <= 0) {
      if (!autoSubmitted) {
        setAutoSubmitted(true);
        startTransition(async () => {
          await finalSubmitAction({ attemptId, mode: "auto" });
        });
      }
      return;
    }

    const id = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [status, remainingSeconds, autoSubmitted, attemptId]);

  const answeredCount = useMemo(
    () => Object.values(answers).filter((v) => v !== null).length,
    [answers]
  );

  const progressPct =
    items.length === 0 ? 0 : Math.round((answeredCount / items.length) * 100);

  const handleSelect = (item: TestItem, optionIndex: number) => {
    if (status !== "in_progress") return;
    setAnswers((prev) => ({
      ...prev,
      [item.questionId]: optionIndex
    }));

    startTransition(async () => {
      await submitAnswerAction({
        attemptId,
        questionId: item.questionId,
        sectionId: item.sectionId,
        selectedOptionIndex: optionIndex,
        timeSpentSeconds: 0
      });
    });
  };

  const handleFinalSubmit = () => {
    if (status !== "in_progress") return;
    startTransition(async () => {
      await finalSubmitAction({ attemptId, mode: "manual" });
    });
  };

  const currentItem = items[currentQuestionIndex];

  const toggleMarkCurrent = () => {
    const id = currentItem.questionId;
    setMarked((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  return (
    <div className="flex gap-4">
      <aside className="w-48 space-y-3 rounded-lg border border-slate-800 bg-slate-900/40 p-3 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Time left</span>
          <span
            className={clsx(
              "font-mono",
              remainingSeconds <= 60 ? "text-red-400" : "text-sky-400"
            )}
          >
            {minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </span>
        </div>
        <div className="mt-2 space-y-2">
          {sections.map((section) => (
            <div key={section.id}>
              <div className="mb-1 flex items-center justify-between font-medium text-slate-300">
                <span>Section {section.id.slice(-4)}</span>
                <span className="text-[10px] text-slate-500">
                  {section.questions.length} Qs
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {section.questions.map((q, idx) => {
                  const index = items.findIndex(
                    (it) => it.questionId === q.questionId
                  );
                  const answered = answers[q.questionId] !== null;
                  const isMarked = marked[q.questionId];
                  return (
                    <button
                      key={q.questionId}
                      type="button"
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={clsx(
                        "h-6 w-6 rounded text-[10px]",
                        index === currentQuestionIndex
                          ? "bg-sky-500 text-white"
                          : isMarked
                          ? "bg-amber-500 text-white"
                          : answered
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-800 text-slate-200"
                      )}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={handleFinalSubmit}
          disabled={status !== "in_progress" || isPending}
          className="mt-3 w-full rounded bg-emerald-500 px-2 py-1 text-xs font-semibold text-white hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          Submit Test
        </button>
      </aside>
      <section className="flex-1 rounded-lg border border-slate-800 bg-slate-900/40 p-4">
        <div className="mb-3 space-y-2 text-xs text-slate-400">
          <div className="flex items-center justify-between">
            <span>
              Question {currentQuestionIndex + 1} of {items.length}
            </span>
            <span>
              Answered{" "}
              <span className="font-semibold text-sky-400">
                {answeredCount}/{items.length}
              </span>
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
            <div
              className="h-full rounded-full bg-sky-500"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
        <h3 className="mb-4 text-sm font-medium text-slate-50">
          {currentItem.text}
        </h3>
        <div className="space-y-2">
          {currentItem.options.map((opt, idx) => {
            const checked = answers[currentItem.questionId] === idx;
            return (
              <button
                key={`${opt.label}-${opt.value}`}
                type="button"
                onClick={() => handleSelect(currentItem, idx)}
                className={clsx(
                  "flex w-full items-center justify-between rounded border px-3 py-2 text-left text-sm",
                  checked
                    ? "border-sky-500 bg-sky-500/10"
                    : "border-slate-800 bg-slate-900/40 hover:border-slate-700"
                )}
              >
                <span>
                  <span className="mr-2 font-semibold text-sky-300">
                    {opt.label}.
                  </span>
                  {opt.value}
                </span>
                {checked && (
                  <span className="text-xs text-sky-400">Selected</span>
                )}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() =>
              setCurrentQuestionIndex((idx) => Math.max(0, idx - 1))
            }
            disabled={currentQuestionIndex === 0}
            className={clsx(
              "rounded border px-3 py-1",
              currentQuestionIndex === 0
                ? "border-slate-800 text-slate-500"
                : "border-slate-700 text-slate-200 hover:border-sky-500"
            )}
          >
            ← Previous
          </button>
          <button
            type="button"
            onClick={toggleMarkCurrent}
            className={clsx(
              "rounded border px-3 py-1",
              marked[currentItem.questionId]
                ? "border-amber-500 text-amber-300"
                : "border-slate-700 text-slate-200 hover:border-amber-500"
            )}
          >
            {marked[currentItem.questionId] ? "Unmark" : "Mark for review"}
          </button>
          <button
            type="button"
            onClick={() =>
              setCurrentQuestionIndex((idx) =>
                Math.min(items.length - 1, idx + 1)
              )
            }
            disabled={currentQuestionIndex === items.length - 1}
            className={clsx(
              "rounded border px-3 py-1",
              currentQuestionIndex === items.length - 1
                ? "border-slate-800 text-slate-500"
                : "border-slate-700 text-slate-200 hover:border-sky-500"
            )}
          >
            Next →
          </button>
        </div>
      </section>
    </div>
  );
}

