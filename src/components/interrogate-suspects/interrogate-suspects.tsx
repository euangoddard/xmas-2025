import { component$ } from "@builder.io/qwik";
import { Card } from "../card/card";
import type { Suspect, Suspects } from "~/types/person";

export interface InterrogateSuspectsProps {
  suspects: Suspects;
  currentSuspect: Suspect;
}

const activeSuspectCssClasses =
  "rounded-r-sm border-l-4 border-red-600 bg-red-800/20 p-3";
const inactiveSuspectCssClasses =
  "cursor-pointer rounded-sm p-3 transition-colors hover:bg-zinc-700/50";

export const InterrogateSuspects = component$<InterrogateSuspectsProps>(
  ({ suspects, currentSuspect }) => {
    return (
      <Card title="Suspects">
        <ul class="space-y-3">
          {suspects.map(({ id, name, role }) =>
            id === currentSuspect.id ? (
              <li key={id} class={activeSuspectCssClasses}>
                <p class="font-display text-lg text-amber-100">{name}</p>
                <p class="text-sm text-stone-400">{role}</p>
              </li>
            ) : (
              <li key={id} class={inactiveSuspectCssClasses}>
                <a href={`/interrogate/${id}/`} class="block">
                  <p class="font-display text-lg text-amber-100">{name}</p>
                  <p class="text-sm text-stone-400">{role}</p>
                </a>
              </li>
            ),
          )}
        </ul>
      </Card>
    );
  },
);
