import { component$, useSignal } from "@builder.io/qwik";
import { CaseFileCard } from "../../components/case-file-card/case-file-card";
import { routeLoader$ } from "@builder.io/qwik-city";
import { type DocumentHead } from "@builder.io/qwik-city";
import { CurrentFileSidebar } from "~/components/current-file-sidebar/current-file-sidebar";
import { PEOPLE } from "~/data/people";
import type { SuspectDetail } from "~/types/person";

export const useCaseFileCards = routeLoader$<readonly SuspectDetail[]>(() => {
  return PEOPLE;
});

export default component$(() => {
  const caseFileCards = useCaseFileCards();
  const selectedCardId = useSignal(caseFileCards.value[0].id);

  return (
    <div class="container mx-auto p-4 md:p-8">
      <header class="mb-8 text-center">
        <h1 class="font-display text-3xl text-red-700 md:text-4xl">Dossier</h1>
        <p class="mt-2 text-lg text-stone-400">
          Review the initial report and select a file to begin interrogation.
        </p>
      </header>

      <section class="mb-8 rounded-md border border-zinc-700 bg-amber-50/10 p-6 text-stone-300">
        <h2 class="mb-4 font-mono text-sm tracking-widest text-teal-400 uppercase">
          Initial Report: 08:00, 25th December
        </h2>
        <dl class="space-y-3 leading-relaxed">
          <div>
            <dt class="font-bold text-amber-200 uppercase">Victim</dt>
            <dd>Lord Alistair Finchley, 72.</dd>
          </div>
          <div>
            <dt class="font-bold text-amber-200 uppercase">Location</dt>
            <dd>The private study, Blackwood Manor.</dd>
          </div>
          <div>
            <dt class="font-bold text-amber-200 uppercase">Circumstances</dt>
            <dd>
              The victim was discovered deceased in his armchair on Christmas
              morning. An empty glass of port was found on the adjacent table.
              The attending physician suggests cardiac arrest, consistent with
              the victim's known poor health. However, the scene feels
              unnervingly pristine.
            </dd>
          </div>
          <div>
            <dt class="font-bold text-amber-200 uppercase">Situation</dt>
            <dd>
              A severe blizzard has rendered all roads impassable. No one has
              entered or left the manor since Christmas Eve. The killer is still
              here.
            </dd>
          </div>
        </dl>
      </section>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="rounded-md border border-zinc-700 bg-zinc-800/50 p-6">
            <h2 class="mb-4 font-mono text-sm tracking-widest text-teal-400 uppercase">
              Case Files
            </h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {caseFileCards.value.map(({ id, ...props }) => {
                return (
                  <CaseFileCard
                    key={id}
                    {...props}
                    isActive={selectedCardId.value === id}
                    onSelect$={() => (selectedCardId.value = id)}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <aside class="lg:col-span-1">
          <CurrentFileSidebar
            {...caseFileCards.value.find(
              (card) => card.id === selectedCardId.value,
            )!}
          />
        </aside>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "A Holly & Ivy Killing - Dossier",
  meta: [
    {
      name: "description",
      content:
        "Review the initial report and select a file to begin interrogation.",
    },
  ],
};
