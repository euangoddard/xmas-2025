import { component$, Slot, useSignal } from "@builder.io/qwik";

export interface HintSectionProps {
  tier: number;
  title: string;
  initiallyHideDetail?: boolean;
}

export const HintSection = component$<HintSectionProps>(
  ({ title, tier, initiallyHideDetail }) => {
    const showDetail = useSignal(!initiallyHideDetail);
    return (
      <div class="mt-8">
        <h3 class="font-display mb-4 text-2xl text-zinc-900">
          <span class="text-teal-800">Tier {tier}:</span>&nbsp;
          {title}
        </h3>
        {showDetail.value ? (
          <div class="space-y-3">
            <Slot />
          </div>
        ) : (
          <button
            class="btn-red mb-4"
            onClick$={() => (showDetail.value = true)}
          >
            Reveal hints
          </button>
        )}
      </div>
    );
  },
);
