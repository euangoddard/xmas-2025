import { component$, Slot } from "@builder.io/qwik";

export interface CardProps {
  title?: string;
}

export const Card = component$<CardProps>(({ title }) => {
  return (
    <div class="rounded-md border border-zinc-700 bg-zinc-800 p-4">
      {title && (
        <h2 class="mb-4 font-mono text-sm tracking-widest text-teal-400 uppercase">
          {title}
        </h2>
      )}
      <Slot />
    </div>
  );
});
