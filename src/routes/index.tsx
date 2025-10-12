import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col items-center justify-center p-4">
      <main class="w-full max-w-3xl rounded-md bg-amber-50 p-8 text-zinc-800 shadow-2xl">
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

        <section>
          <h2 class="mb-4 font-mono text-sm tracking-widest text-teal-800 uppercase">
            How to Play
          </h2>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <div class="font-display text-2xl text-red-800">1.</div>
              <div>
                <h3 class="font-bold text-zinc-800">Review the Dossier</h3>
                <p class="text-zinc-600">
                  Use the panels to review the profiles of each suspect and the
                  evidence you have collected so far. This is your case file.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="font-display text-2xl text-red-800">2.</div>
              <div>
                <h3 class="font-bold text-zinc-800">
                  Interrogate the Suspects
                </h3>
                <p class="text-zinc-600">
                  Select a suspect and ask them questions directly. Be specific.
                  The more detailed your question, the more revealing the answer
                  might be.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="font-display text-2xl text-red-800">3.</div>
              <div>
                <h3 class="font-bold text-zinc-800">Uncover Contradictions</h3>
                <p class="text-zinc-600">
                  Listen carefully. A clue from one suspect can be used to
                  challenge another's story. Confronting a suspect with new
                  evidence is the only way to break their alibi and reveal their
                  deepest secrets.
                </p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <div class="font-display text-2xl text-red-800">4.</div>
              <div>
                <h3 class="font-bold text-zinc-800">Make Your Accusation</h3>
                <p class="text-zinc-600">
                  Once you believe you know the killer's identity, their motive,
                  and their opportunity, you must confront them with all the
                  facts to solve the case.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer class="mt-8 border-t-2 border-stone-300 pt-6 text-center">
          <Link
            href="/dossier"
            class="rounded-sm bg-red-800 px-8 py-3 font-mono text-lg tracking-wider text-stone-100 uppercase shadow-lg transition-all duration-200 hover:bg-red-700 hover:shadow-xl focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-amber-50 focus:outline-none"
          >
            Begin Investigation
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
