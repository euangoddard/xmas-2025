import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { HintSection } from "~/components/hint-section/hint-section";
import { HintItem } from "~/components/hint-item/hint-item";
import { ReturnLink } from "~/components/return-link/return-link";

export const useFromSuspect = routeLoader$(({ url }) => {
  return url.searchParams.get("from") || "";
});

export default component$(() => {
  const fromSuspect = useFromSuspect();
  return (
    <div class="container mx-auto p-4 md:p-8">
      <header class="mb-8 text-center">
        <h1 class="font-display text-3xl text-red-700 md:text-4xl">
          Case Hints
        </h1>
        <p class="mt-2 text-lg text-stone-400">
          Stuck? A good detective knows when to seek out help!
        </p>
      </header>

      <main class="mx-auto max-w-4xl">
        <div class="rounded-md bg-amber-50 p-6 text-zinc-800 shadow-2xl md:p-8">
          <div class="mb-6 flex items-center justify-between border-b-2 border-stone-300 pb-4">
            <h2 class="font-mono text-sm tracking-widest text-teal-800 uppercase">
              Guidance for Detectives
            </h2>
            <ReturnLink fromSuspect={fromSuspect.value} />
          </div>

          <p class="mb-6 text-zinc-700">
            Hints are broken down into three Tiers. Start with{" "}
            <span class="font-semibold text-teal-800">Tier 1</span> and only
            proceed to subsequent tiers if you are still truly stuck. By the
            time you get to{" "}
            <span class="font-semibold text-teal-800">Tier 3</span>, the
            solution will be laid out clearly.
          </p>

          <HintSection tier={1} title="General Interrogation Tactics">
            <HintItem summary="Hint 1.1: Be Specific">
              Don't just ask "<em>What did you do last night?</em>" Ask "
              <em>
                Where were you at 9:30 PM, when the carol singers arrived?
              </em>
              " Precise questions get precise answers (or precise lies).
            </HintItem>
            <HintItem summary="Hint 1.2: Use Information as a Weapon">
              If you learn something from one suspect, use it to challenge
              another. For example: "<em>I spoke to Marcus, and he said…</em>"
              This is the key to breaking their prepared stories.
            </HintItem>
            <HintItem summary="Hint 1.3: Follow the Motive">
              Everyone seems to have a motive. Ask about them directly. "
              <em>I hear you're in debt, Marcus.</em>"; "
              <em>Lady Beatrice, was your marriage a happy one?</em>"; "
              <em>Eleanor, how badly did you need that money?</em>"
            </HintItem>
          </HintSection>

          <HintSection
            tier={2}
            title="Specific Lines of Inquiry"
            initiallyHideDetail={true}
          >
            <HintItem summary="Hint 2.1: The Unhappy Marriage">
              Lady Beatrice is hiding more than just unhappiness. She had a
              major argument with Alistair just before he died. Confront her
              about the "divorce" or her "affair."
            </HintItem>
            <HintItem summary="Hint 2.2: The Blackmail Plot">
              Marcus's story about "reconciliation" is a lie. He was trying to
              blackmail his father. Ask him what "Thomas Vance" has to do with
              the family fortune.
            </HintItem>
            <HintItem summary="Hint 2.3: The Silent Witness">
              Mr. Hobbs sees everything. He knows who was moving about the house
              during the key moments. Ask him <strong>exactly</strong> who he
              saw near the study when the carol singers arrived.
            </HintItem>
          </HintSection>

          <HintSection tier={3} title="The Solution" initiallyHideDetail={true}>
            <HintItem summary="Hint 3.1: The Opportunity">
              Mr. Hobbs will reveal that Dr. Vance entered the study alone while
              everyone was distracted by the carolers. This is the 90-second
              window the killer needed.
            </HintItem>
            <HintItem summary="Hint 3.2: The Motive">
              Once you learn the name "Thomas Vance" from Marcus, you have the
              motive. The final step is to connect that name to the person who
              had the opportunity.
            </HintItem>
            <HintItem summary="Hint 3.3: The Final Accusation">
              The killer is Dr. Isabelle Vance. Her grandfather was Thomas
              Vance. She poisoned the port as revenge for her family's ruin.
              Confront her with all three facts: her name, her opportunity (seen
              by Hobbs), and her motive (revenge).
            </HintItem>
          </HintSection>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: "A Holly & Ivy Killing - Case Hints",
  meta: [
    {
      name: "description",
      content:
        "A Holly & Ivy Killing - get hints and guidance to help solve the case.",
    },
  ],
};
