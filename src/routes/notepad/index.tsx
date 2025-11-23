import { component$, useStore } from "@builder.io/qwik";
import {
  routeLoader$,
  routeAction$,
  useNavigate,
  DocumentHead,
} from "@builder.io/qwik-city";
import { ReturnLink } from "~/components/return-link/return-link";
import { cacheExpirationTtl } from "~/data/caching";
import { getGameId } from "~/utils/game-id";

export const useNotes = routeLoader$(async ({ platform, cookie }) => {
  const { XMAS_2025 } = platform.env;
  const gameId = getGameId(cookie);
  const notes = await XMAS_2025.get(`${gameId}/notes`, "text");
  return notes || "";
});

export const useFromSuspect = routeLoader$(({ url }) => {
  return url.searchParams.get("from") || "";
});

export const useSaveNotes = routeAction$(
  async ({ notes }, { platform, cookie }) => {
    const { XMAS_2025 } = platform.env;
    const gameId = getGameId(cookie);
    await XMAS_2025.put(`${gameId}/notes`, (notes as string) || "", {
      expirationTtl: cacheExpirationTtl,
    });
    return { success: true };
  },
);

export default component$(() => {
  const notesResource = useNotes();
  const saveNotesAction = useSaveNotes();
  const fromSuspect = useFromSuspect();
  const navigate = useNavigate();

  const state = useStore({
    notes: notesResource.value ?? "",
    saving: false,
    saved: false,
  });

  return (
    <div class="container mx-auto p-4 md:p-8">
      <header class="mb-8 text-center">
        <h1 class="font-display text-3xl text-red-700 md:text-4xl">
          Investigator's Notepad
        </h1>
        <p class="mt-2 text-lg text-stone-400">
          Record your deductions and keep track of loose ends.
        </p>
      </header>

      <main class="mx-auto max-w-4xl">
        <div class="rounded-md bg-amber-50 p-6 text-zinc-800 shadow-2xl md:p-8">
          <div class="mb-6 flex items-center justify-between border-b-2 border-stone-300 pb-4">
            <h2 class="font-mono text-sm tracking-widest text-teal-800 uppercase">
              Case Notes: The Finchley Murder
            </h2>
            <ReturnLink fromSuspect={fromSuspect.value} />
          </div>

          <textarea
            id="notepad"
            rows={15}
            class="w-full rounded-sm border border-stone-300 bg-stone-100 p-4 font-mono text-base text-zinc-800 focus:ring-2 focus:ring-red-800 focus:outline-none"
            placeholder="Type your notes here…"
            value={state.notes}
            onInput$={(e) =>
              (state.notes = (e.target as HTMLTextAreaElement).value)
            }
          ></textarea>

          <div class="mt-6 text-right">
            <button
              class="rounded-sm bg-red-800 px-8 py-3 font-mono tracking-wider text-stone-100 uppercase shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-amber-50 focus:outline-none"
              onClick$={async () => {
                state.saving = true;
                state.saved = false;
                await saveNotesAction.submit({ notes: state.notes });
                state.saving = false;
                state.saved = true;
                await navigate(
                  fromSuspect.value
                    ? `/interrogate/${fromSuspect.value}`
                    : `/dossier`,
                );
              }}
              disabled={state.saving}
            >
              {state.saving ? "Saving…" : state.saved ? "Saved!" : "Save Notes"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "A Holly & Ivy Killing - Notepad",
  meta: [
    {
      name: "description",
      content: "A Holly & Ivy Killing - keep notes for your investigation.",
    },
  ],
};
