import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";
import WelcomeImage from "~/images/welcome.png?w=640&h=640&jsx";

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col items-center justify-center">
      <main class="w-full max-w-3xl rounded-md bg-amber-50 p-6 text-zinc-800 shadow-2xl">
        <header class="mb-6 border-b-2 border-stone-300 pb-6 text-center">
          <h1 class="font-display text-3xl text-red-900 md:text-4xl">
            Welcome and Merry Christmas!
          </h1>
          <p class="mt-2 text-lg text-zinc-600">
            From Euan, Chloe, Eric and Alex
          </p>
        </header>

        <section class="mb-8">
          <p class="text-base leading-relaxed text-zinc-700 italic">
            Christmas morning at the isolated Blackwood Manor has been shattered
            by a chilling discovery. The patriarch, Lord Alistair Finchley, has
            been found dead in his study. A fierce blizzard has cut off all
            contact with the outside world, leaving you — a lone investigator —
            trapped with a house full of secrets and a handful of suspects.
            Everyone has a motive. Everyone is a liar. It is up to you to
            unravel the truth before the snow melts.
          </p>
        </section>

        <div class="my-8 flex justify-center">
          <WelcomeImage class="max-w-s w-full rounded-lg shadow-lg" />
        </div>

        <footer class="mt-8 border-t-2 border-stone-300 pt-6 text-center">
          <Link
            href="/how-to-play/"
            class="rounded-sm bg-red-800 px-8 py-3 font-mono text-lg tracking-wider text-stone-100 uppercase shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-amber-50 focus:outline-none"
          >
            How to Play
          </Link>
        </footer>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "A Holly & Ivy Killing",
  meta: [
    {
      name: "description",
      content: "A Holly & Ivy Killing - A Christmas Mystery",
    },
  ],
};
