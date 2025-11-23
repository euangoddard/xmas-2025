import { component$ } from "@builder.io/qwik";
import {
  Link,
  routeAction$,
  routeLoader$,
  z,
  zod$,
  type DocumentHead,
} from "@builder.io/qwik-city";
import { Card } from "~/components/card/card";
import { InterrogateSuspects } from "~/components/interrogate-suspects/interrogate-suspects";
import { InterrogateChat } from "~/components/interrogate-chat/interrogate-chat";
import { PEOPLE } from "~/data/people";
import type { Suspect, Suspects } from "~/types/person";
import { getGameId } from "~/utils/game-id";
import type { Chat } from "~/types/chat";
import { createSummary } from "~/utils/create-summary";
import { cacheExpirationTtl } from "~/data/caching";

export const useSuspects = routeLoader$<Suspects>(() => {
  return PEOPLE.map(({ id, name, role }) => ({ id, name, role }));
});

export const useCurrentSuspect = routeLoader$<Suspect>(
  ({ params, redirect }) => {
    const suspect = PEOPLE.find((p) => p.id === params.suspect);
    if (!suspect) {
      throw redirect(308, "/");
    }
    return suspect;
  },
);

export const useChat = routeLoader$<Chat>(
  async ({ params, platform, cookie }) => {
    const { XMAS_2025 } = platform.env;
    const gameId = getGameId(cookie);

    const chat = await XMAS_2025.get<Chat>(
      `${gameId}/chat/${params.suspect}`,
      "json",
    );
    return chat || { turns: [], id: `${gameId}/chat/${params.suspect}` };
  },
);

export const useAddSummaryToNotepad = routeAction$(
  async ({ question, answer, suspect }, { platform, env, cookie }) => {
    const { XMAS_2025 } = platform.env;
    const gameId = getGameId(cookie);
    const existingNotes = (await XMAS_2025.get(
      `${gameId}/notes`,
      "text",
    )) as string;

    const summary = await createSummary(question, answer, suspect, env);
    let updatedNotes: string;
    if (!existingNotes || existingNotes.trim() === "") {
      updatedNotes = summary ?? "";
    } else {
      updatedNotes = `${existingNotes}\n\n${summary ?? ""}`;
    }

    await XMAS_2025.put(`${gameId}/notes`, updatedNotes, {
      expirationTtl: cacheExpirationTtl,
    });

    return { success: true, summary };
  },
  zod$({
    question: z.string(),
    answer: z.string(),
    suspect: z.string(),
  }),
);

export default component$(() => {
  const suspects = useSuspects();
  const currentSuspect = useCurrentSuspect();
  const chat = useChat();

  return (
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <aside class="space-y-6 lg:col-span-1">
        <InterrogateSuspects
          suspects={suspects.value}
          currentSuspect={currentSuspect.value}
        />

        <div class="hidden md:block">
          <Card title="Actions">
            <ul class="list-inside list-disc space-y-2 text-stone-300">
              <li>
                <Link
                  href={`/notepad/?from=${currentSuspect.value.id}`}
                  class="font-bold text-amber-400 hover:text-red-600 hover:underline"
                >
                  Open notepad
                </Link>
              </li>
              <li>
                <Link
                  href={`/hints/?from=${currentSuspect.value.id}`}
                  class="font-bold text-amber-400 hover:text-red-600 hover:underline"
                >
                  View hints
                </Link>
              </li>
              <li>
                <Link
                  href="/dossier/"
                  class="font-bold text-amber-400 hover:text-red-600 hover:underline"
                >
                  View the Dossier
                </Link>
              </li>
              <li>
                <Link
                  href="/accuse/"
                  class="font-bold text-amber-400 hover:text-red-600 hover:underline"
                >
                  Accuse the killer
                </Link>
              </li>
            </ul>
          </Card>
        </div>
      </aside>

      <main class="lg:col-span-2">
        <InterrogateChat
          currentSuspect={currentSuspect.value}
          chat={chat.value}
        />
      </main>
    </div>
  );
});

export const head: DocumentHead = ({ resolveValue }) => {
  const currentSuspect = resolveValue(useCurrentSuspect);
  return {
    title: `A Holly & Ivy Killing - Interrogating ${currentSuspect.name}`,
    meta: [
      {
        name: "description",
        content: `A Holly & Ivy Killing - carry out your interrogation of ${currentSuspect.name}.`,
      },
    ],
  };
};
