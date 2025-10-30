import { component$ } from "@builder.io/qwik";
import { type ChatTurns, Role } from "~/types/chat";
import { useAddSummaryToNotepad } from "~/routes/interrogate/[suspect]";
import { type Suspect } from "~/types/person";
import { Link } from "@builder.io/qwik-city";

export interface NoteTakerProps {
  turns: ChatTurns;
  suspect: Suspect;
}

export const NoteTaker = component$<NoteTakerProps>(({ turns, suspect }) => {
  const addSummaryToNotepad = useAddSummaryToNotepad();

  return (
    <>
      {turns.length >= 2 && (
        <div class="mb-4 flex items-center justify-end">
          {addSummaryToNotepad.value?.success ? (
            <div class="rounded border border-green-300 bg-green-50 px-3 py-2 text-xs text-green-800">
              <div class="mb-1 font-bold">Summary added to notepad:</div>
              <div>{addSummaryToNotepad.value.summary}</div>
              <div class="mt-2">
                <Link
                  href="/notepad"
                  class="font-mono text-xs text-green-700 underline hover:text-green-900"
                >
                  View Notepad
                </Link>
              </div>
            </div>
          ) : (
            <button
              class="inline-flex items-center gap-2 rounded border border-stone-300 bg-stone-200 px-3 py-1 text-xs text-zinc-700 transition hover:underline"
              disabled={addSummaryToNotepad.isRunning}
              onClick$={() => {
                const questions = turns.filter(
                  (turn) => turn.role === Role.User,
                );
                const answers = turns.filter(
                  (turn) => turn.role === Role.Assistant,
                );
                const lastQuestion = questions.at(-1)?.content;
                const lastAnswer = answers.at(-1)?.content;
                if (!lastQuestion || !lastAnswer) return;
                addSummaryToNotepad.submit({
                  question: lastQuestion,
                  answer: lastAnswer,
                  suspect: suspect.name,
                });
              }}
            >
              {addSummaryToNotepad.isRunning && (
                <span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-t-2 border-zinc-700/40 border-t-zinc-700"></span>
              )}
              Add snippet to Notepad
            </button>
          )}
        </div>
      )}
    </>
  );
});
