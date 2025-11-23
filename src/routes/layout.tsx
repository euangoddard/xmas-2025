import { component$, Slot } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { RequestHandler } from "@builder.io/qwik-city";
import { getGameId } from "~/utils/game-id";
import { MobileNav } from "~/components/mobile-nav/mobile-nav";

export default component$(() => {
  return (
    <>
      <main class="container mx-auto p-4 pb-24 md:p-8 md:pb-8">
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
      <MobileNav />
    </>
  );
});

export const onRequest: RequestHandler = async ({ cookie, next }) => {
  getGameId(cookie);
  await next();
};
