import { component$, Slot } from "@builder.io/qwik";

export interface HintItemProps {
  summary: string;
}

export const HintItem = component$<HintItemProps>(({ summary }) => {
  return (
    <details>
      <summary>{summary}</summary>
      <div>
        <p>
          <Slot />
        </p>
      </div>
    </details>
  );
});
