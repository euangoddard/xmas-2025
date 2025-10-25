import { GoogleGenAI } from "@google/genai";
import type { RequestHandler } from "@builder.io/qwik-city";
import { type ChatTurns, Role } from "~/types/chat";
import type { SuspectIds } from "~/types/person";
import { SYSTEM_PROMPTS } from "~/data/system-prompts";
import { nanoid } from "nanoid";
import { cacheExpirationTtl } from "~/data/caching";

export const onPost: RequestHandler = async ({
  request,
  params,
  getWritableStream,
  env,
  headers,
  platform,
}) => {
  headers.set("Content-Type", "text/event-stream");
  headers.set("Cache-Control", "no-cache");
  headers.set("Connection", "keep-alive");

  const { turns, chatId } = (await request.json()) as {
    turns: ChatTurns;
    chatId: string;
  };
  const { suspect } = params;
  if (!isKnownSuspect(suspect)) {
    throw new Response("Unknown suspect", { status: 400 });
  }

  const systemInstruction = SYSTEM_PROMPTS[suspect];

  const history = turns.map(({ role, content }) => {
    return {
      role: role === Role.User ? "user" : "model",
      parts: [{ text: content }],
    };
  });

  const writableStream = getWritableStream();
  const writer = writableStream.getWriter();
  const encoder = new TextEncoder();

  const ai = new GoogleGenAI({ apiKey: env.get("GOOGLE_API_KEY") });
  const response = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: history,
    config: {
      systemInstruction: systemInstruction,
    },
  });

  let message = "";
  for await (const chunk of response) {
    writer.write(encoder.encode(chunk.text));
    message += chunk.text;
  }

  const { XMAS_2025 } = platform.env;
  await XMAS_2025.put(
    chatId,
    JSON.stringify({
      id: chatId,
      turns: [
        ...turns,
        { id: nanoid(), role: Role.Assistant, content: message },
      ],
    }),
    {
      expirationTtl: cacheExpirationTtl,
    },
  );

  writer.close();
};

function isKnownSuspect(suspect: string): suspect is SuspectIds {
  return ["beatrice", "marcus", "eleanor", "hobbs", "isabelle"].includes(
    suspect,
  );
}
