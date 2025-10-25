import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { RequestHandler } from "@builder.io/qwik-city";
import { getGameId } from "~/utils/game-id";

export default component$(() => {
  return (
    <main class="container mx-auto p-4 md:p-8">
      <h1 class="font-display mb-6 text-center text-4xl md:text-5xl">
        <Link
          href="/"
          class="decoration-skip font-display text-amber-100 underline-offset-4 hover:underline"
        >
          A Holly & Ivy Killing
        </Link>
      </h1>
      <Slot />
    </main>
  );
});

export const onRequest: RequestHandler = async ({ cookie, next }) => {
  getGameId(cookie);
  await next();
};
