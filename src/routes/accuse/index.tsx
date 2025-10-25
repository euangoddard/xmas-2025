import { component$, useSignal, useComputed$ } from "@builder.io/qwik";
import {
  DocumentHead,
  Form,
  routeAction$,
  routeLoader$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { adjudicate } from "./adjudicate";
import { AdjudicationResult } from "../../components/adjudication-result/adjudication-result";
import { PEOPLE } from "~/data/people";

interface Accused {
  id: string;
  name: string;
  imgSrc: string;
}

export const useAccused = routeLoader$<Accused[]>(() => {
  return PEOPLE.map(({ id, name, imgSrc }) => ({ id, name, imgSrc }));
});

export const useCheckAccusation = routeAction$(
  async (data, { env }) => {
    const { accused, method, motive } = data;

    const result = await adjudicate(accused, method, motive, env);

    return { success: true, result };
  },
  zod$({
    accused: z.string(),
    method: z.string(),
    motive: z.string(),
  }),
);

export default component$(() => {
  const accusedList = useAccused();
  const checkAccusation = useCheckAccusation();
  const selected = useSignal<string | null>(null);

  const result = useComputed$(() => checkAccusation.value?.result);

  return (
    <div class="container mx-auto p-4 md:p-8">
      <header class="mb-8 text-center">
        <h1 class="font-display text-3xl text-red-700 md:text-4xl">
          Make Your Accusation
        </h1>
        <p class="mt-2 text-lg text-stone-400">
          The time has come to present your case. Let's uncover the truth!
        </p>
      </header>

      <main class="mx-auto max-w-4xl">
        {result.value ? (
          <AdjudicationResult
            isCaseSolved={result.value.isCaseSolved}
            killerAssessment={result.value.killerAssessment}
            methodAssessment={result.value.methodAssessment}
            motiveAssessment={result.value.motiveAssessment}
            finalVerdict={result.value.finalVerdict}
          />
        ) : (
          <Form
            class="rounded-md bg-amber-50 p-6 text-zinc-800 shadow-2xl md:p-8"
            action={checkAccusation}
          >
            <div class="mb-6 flex items-center justify-between border-b-2 border-stone-300 pb-4">
              <h2 class="font-mono text-sm tracking-widest text-teal-800 uppercase">
                Final Report
              </h2>
              <a
                href="#"
                class="font-mono text-sm text-red-800 hover:underline"
              >
                Return to Dossier
              </a>
            </div>

            <div class="space-y-6">
              <div>
                <label class="mb-3 block font-bold text-zinc-700">
                  1. I Accuse...
                </label>
                <input
                  type="hidden"
                  name="accused"
                  value={selected.value || ""}
                />
                <div class="grid grid-cols-3 gap-4 sm:grid-cols-5">
                  {accusedList.value.map((person) => (
                    <button
                      type="button"
                      key={person.id}
                      class={[
                        "block rounded-sm border-2 bg-stone-100 p-2 shadow-md transition-all duration-300",
                        selected.value === person.name
                          ? "border-red-800 shadow-lg ring-2 ring-red-800/50"
                          : "border-transparent hover:border-red-800/50 hover:shadow-lg",
                      ].join(" ")}
                      onClick$={() => (selected.value = person.name)}
                      disabled={checkAccusation.isRunning}
                    >
                      <img
                        src={person.imgSrc}
                        alt={`Portrait of ${person.name}`}
                        class="h-auto w-full rounded-sm object-cover"
                        width={150}
                        height={150}
                      />
                      <p class="font-display mt-2 text-center text-sm text-red-900">
                        {person.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label for="method" class="mb-2 block font-bold text-zinc-700">
                  2. The murder was committed by...
                </label>
                <input
                  type="text"
                  id="method"
                  name="method"
                  class="w-full rounded-sm border border-stone-300 bg-stone-100 p-3 font-mono text-base text-zinc-800 focus:ring-2 focus:ring-red-800 focus:outline-none"
                  placeholder="e.g., Poison in the port..."
                  autocomplete="off"
                  required
                  disabled={checkAccusation.isRunning}
                />
              </div>

              <div>
                <label for="motive" class="mb-2 block font-bold text-zinc-700">
                  3. The killer's motive was...
                </label>
                <textarea
                  id="motive"
                  name="motive"
                  rows={5}
                  class="w-full rounded-sm border border-stone-300 bg-stone-100 p-3 font-mono text-base text-zinc-800 focus:ring-2 focus:ring-red-800 focus:outline-none"
                  placeholder="e.g., Revenge for a past injustice..."
                  required
                  disabled={checkAccusation.isRunning}
                ></textarea>
              </div>
            </div>

            <div class="mt-8 border-t-2 border-stone-300 pt-6 text-center">
              <button
                class="inline-flex items-center gap-4 rounded-sm bg-red-800 px-8 py-3 font-mono text-lg tracking-widest text-stone-100 uppercase shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-amber-50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                disabled={selected.value === null || checkAccusation.isRunning}
              >
                {checkAccusation.isRunning && (
                  <span class="inline-block h-5 w-5 animate-spin rounded-full border-2 border-t-2 border-white/40 border-t-white"></span>
                )}
                Confirm Accusation
              </button>
            </div>
          </Form>
        )}
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "A Holly & Ivy Killing - Accuse the killer",
  meta: [
    {
      name: "description",
      content:
        "A Holly & Ivy Killing - make your final accusation and solve the case.",
    },
  ],
};
