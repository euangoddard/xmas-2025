import { component$ } from "@builder.io/qwik";

export const Thinking = component$(() => {
  return (
    <div class="mb-8 flex items-center gap-2">
      <span class="loading loading-ring loading-md text-primary"></span>
      <span class="text-gray-500">Thinking&hellip;</span>
    </div>
  );
});
