import { component$ } from "@builder.io/qwik";
import { Link, type DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <div class="flex min-h-screen flex-col items-center justify-center">
      <main class="w-full max-w-3xl rounded-md bg-amber-50 p-6 text-zinc-800 shadow-2xl">
        <header class="mb-6 border-b-2 border-stone-300 pb-6 text-center">
          <h1 class="font-display text-3xl text-red-900 md:text-4xl">
            How to Play
          </h1>
          <p class="mt-2 text-lg text-zinc-600">A Holly & Ivy Killing</p>
        </header>

        <section>
          <h2 class="mb-4 font-mono text-sm tracking-widest text-teal-800 uppercase">
            How to Play
          </h2>
          <ol class="space-y-6">
            <li class="flex items-start">
              <span class="mr-4 font-mono text-3xl text-teal-800">1.</span>
              <div>
                <h3 class="font-display text-xl text-zinc-900">
                  Review the Dossier
                </h3>
                <p class="text-zinc-700">
                  Read the initial case report and the profiles of the five
                  suspects. Understanding who they are is the first step to
                  uncovering what they're hiding.
                </p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="mr-4 font-mono text-3xl text-teal-800">2.</span>
              <div>
                <h3 class="font-display text-xl text-zinc-900">
                  Use Your Notepad
                </h3>
                <p class="text-zinc-700">
                  This is your most important tool. Write down alibis,
                  inconsistencies, names, and motives. A well-kept note is the
                  key to cracking the case.
                </p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="mr-4 font-mono text-3xl text-teal-800">3.</span>
              <div>
                <h3 class="font-display text-xl text-zinc-900">
                  Probe for Secrets
                </h3>
                <p class="text-zinc-700">
                  Interrogate everyone, but do not accept their first story.{" "}
                  <strong class="font-bold text-red-800">
                    Suspects have secrets they will not volunteer.
                  </strong>{" "}
                  If you learn something new from one suspect (like a name or a
                  secret argument), use it to confront another. A lie will crack
                  under scrutiny.
                </p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="mr-4 font-mono text-3xl text-teal-800">4.</span>
              <div>
                <h3 class="font-display text-xl text-zinc-900">
                  Connect the Clues
                </h3>
                <p class="mb-2 text-zinc-700">
                  As you gather information, a timeline will form. Who had the
                  opportunity? Who had the strongest motive? Who is lying about
                  their alibi?
                </p>
                <p class="text-zinc-700">
                  If you're stuck, use the hints to help move your investigation
                  along.
                </p>
              </div>
            </li>
            <li class="flex items-start">
              <span class="mr-4 font-mono text-3xl text-teal-800">5.</span>
              <div>
                <h3 class="font-display text-xl text-zinc-900">
                  Make Your Accusation
                </h3>
                <p class="text-zinc-700">
                  When you are certain you have the killer, the method, and the
                  motive, proceed to the accusation. But be warned—a false
                  accusation will let the killer walk free.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <footer class="mt-8 border-t-2 border-stone-300 pt-6 text-center">
          <Link
            href="/dossier/"
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
  title: "A Holly & Ivy Killing - How to Play",
  meta: [
    {
      name: "description",
      content: "A Holly & Ivy Killing - Instructions on how to play the game",
    },
  ],
};
