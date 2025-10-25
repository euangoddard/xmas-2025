import { component$, useSignal } from "@builder.io/qwik";
import { AdjudicationResultItem } from "../adjudication-result-item/adjudication-result-item";
import { Link } from "@builder.io/qwik-city";
import type { AdjudicationResult as AdjudicationResultProps } from "~/types/adjudication-result";

export const AdjudicationResult = component$<AdjudicationResultProps>(
  ({
    isCaseSolved,
    killerAssessment,
    methodAssessment,
    motiveAssessment,
    finalVerdict,
  }) => {
    const showDetails = useSignal(false);
    return (
      <div class="panel-amber">
        <div class="mb-6 flex items-center justify-between border-b-2 border-stone-300 pb-4">
          <h2 class="heading-mono">Adjudication Result</h2>
          <Link
            href="/dossier/"
            class="font-mono text-sm text-red-800 hover:underline"
          >
            Return to Dossier
          </Link>
        </div>
        <div class="space-y-6">
          <div>
            <span class="font-bold text-zinc-700">Case Status:</span>
            <span
              class={[
                "ml-2 font-bold",
                isCaseSolved ? "text-green-700" : "text-red-700",
              ]}
            >
              {isCaseSolved ? "Solved!" : "Unsolved"}
            </span>
          </div>
          {!showDetails.value && (
            <div class="mt-4 text-center">
              <button
                class="rounded bg-teal-700 px-4 py-2 font-mono text-sm text-white shadow transition hover:bg-teal-800"
                onClick$={() => (showDetails.value = true)}
              >
                Show Details
              </button>
            </div>
          )}
          {showDetails.value && (
            <>
              <AdjudicationResultItem
                label="Killer Assessment"
                content={killerAssessment}
              />
              <AdjudicationResultItem
                label="Method Assessment"
                content={methodAssessment}
              />
              <AdjudicationResultItem
                label="Motive Assessment"
                content={motiveAssessment}
              />
              <div class="mt-6 rounded border-l-4 border-red-800 bg-stone-100 p-4">
                <span class="font-bold text-red-800">Final Verdict:</span>
                <p class="mt-2 text-zinc-800">{finalVerdict}</p>
              </div>
            </>
          )}
        </div>
      </div>
    );
  },
);
