import {
  $,
  component$,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";
import { nanoid } from "nanoid";
import { type Chat, type ChatTurns, Role } from "~/types/chat";
import type { Suspect } from "~/types/person";
import { UserMessage } from "../user-message/user-message";
import { SuspectMessage } from "../suspect-message/suspect-message";
import { Thinking } from "../thinking/thinking";
import { NoteTaker } from "../note-taker/note-taker";

export interface InterrogateChatProps {
  currentSuspect: Suspect;
  chat: Chat;
}

interface State {
  turns: ChatTurns;
  loading: boolean;
  thinking: boolean;
  prompt: string;
}

export const InterrogateChat = component$<InterrogateChatProps>(
  ({ currentSuspect, chat }) => {
    const messagePanel = useSignal<HTMLDivElement | undefined>(undefined);

    const state = useStore<State>({
      turns: chat.turns,
      loading: false,
      thinking: false,
      prompt: "",
    });

    const sendChat = $(async () => {
      state.thinking = true;
      state.loading = true;

      const response = await fetch(`/api/interrogate/${currentSuspect.id}`, {
        method: "POST",
        body: JSON.stringify({
          chatId: chat.id,
          turns: state.turns,
        }),
        headers: { "Content-Type": "application/json" },
      });

      state.turns.push({
        id: nanoid(),
        role: Role.Assistant,
        content: "",
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        state.thinking = false;
        if (done) {
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        state.turns.at(-1)!.content += chunk;
        // Scroll to the bottom of the message panel
        if (messagePanel.value) {
          messagePanel.value.scrollTo({
            top: messagePanel.value.scrollHeight,
            behavior: "smooth",
          });
        }
      }

      state.prompt = "";
      state.loading = false;
    });

    const handleSubmit = $(async (e: SubmitEvent) => {
      const formData = Object.fromEntries(
        new FormData(e.target as HTMLFormElement).entries(),
      );

      state.turns.push({
        id: nanoid(),
        role: Role.User,
        content: formData.prompt as string,
      });

      sendChat();
    });

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(() => {
      const lastTurn = state.turns.at(-1);
      if (lastTurn?.role === Role.User) {
        // The last turn is from the user, so ask the assistant
        sendChat();
      }
    });

    useTask$(({ track }) => {
      const isThinking = track(() => state.thinking);
      if (isThinking && messagePanel.value) {
        // Scroll to the bottom of the message panel when thinking starts
        setTimeout(() => {
          messagePanel.value!.scrollTo({
            top: messagePanel.value!.scrollHeight,
            behavior: "smooth",
          });
        }, 100);
      }
    });

    return (
      <div class="panel-amber flex h-full flex-col shadow-lg">
        <h2 class="font-display heading-mono mb-1 text-2xl text-red-900">
          Interrogation: {currentSuspect.name}
        </h2>

        <div
          class="mb-6 max-h-[60vh] flex-grow space-y-4 overflow-y-auto"
          ref={messagePanel}
        >
          {state.turns.map((turn) => {
            return turn.role === Role.User ? (
              <UserMessage message={turn.content} key={turn.id} />
            ) : (
              <SuspectMessage
                suspect={currentSuspect}
                message={turn.content}
                key={turn.id}
              />
            );
          })}
          {state.thinking && <Thinking />}
        </div>

        {!state.thinking && (
          <NoteTaker turns={state.turns} suspect={currentSuspect} />
        )}

        <form class="mt-auto" onSubmit$={handleSubmit} preventdefault:submit>
          <label
            for="question"
            class="mb-2 block font-mono text-sm tracking-widest text-teal-800 uppercase"
          >
            Ask {currentSuspect.name} a question:
          </label>
          <div class="flex gap-2">
            <textarea
              id="question"
              rows={1}
              class="w-full resize-none rounded-sm border border-stone-300 bg-stone-100 p-3 font-mono focus:ring-2 focus:ring-red-800 focus:outline-none"
              placeholder="Ask your question…"
              name="prompt"
              value={state.prompt}
              onInput$={(e) => {
                const textarea = e.target as HTMLTextAreaElement;
                state.prompt = textarea.value;
                textarea.style.height = "auto";
                textarea.style.height = textarea.scrollHeight + "px";
              }}
              onKeyDown$={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  const form = (e.target as HTMLTextAreaElement).form;
                  if (form) {
                    form.requestSubmit();
                  }
                }
              }}
              disabled={state.loading || state.thinking}
            ></textarea>
            <button
              class="btn-red px-6 py-2 whitespace-nowrap shadow-md"
              disabled={
                state.loading || state.thinking || state.prompt.trim() === ""
              }
            >
              Ask
            </button>
          </div>
        </form>
      </div>
    );
  },
);
