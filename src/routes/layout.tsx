import { component$, Slot } from "@builder.io/qwik";
import { RequestHandler } from "@builder.io/qwik-city";
import { getGameId } from "~/utils/game-id";

export default component$(() => {
  return (
    <main class="container mx-auto p-4 md:p-8">
      <h1 class="font-display mb-6 text-center text-4xl text-amber-100 md:text-5xl">
        A Holly & Ivy Killing
      </h1>
      <Slot />
    </main>
  );
});

export const onRequest: RequestHandler = async ({ cookie, next }) => {
  getGameId(cookie);
  await next();
};
