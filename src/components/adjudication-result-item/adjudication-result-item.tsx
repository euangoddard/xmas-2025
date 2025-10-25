import { component$ } from "@builder.io/qwik";

export interface AdjudicationResultItemProps {
  label: string;
  content: string;
}

export const AdjudicationResultItem = component$<AdjudicationResultItemProps>(
  ({ label, content }) => {
    return (
      <div>
        <span class="font-bold text-zinc-700">{label}:</span>
        <span class="ml-2">{content}</span>
      </div>
    );
  },
);
