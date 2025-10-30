import { type EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { createUserContent, GoogleGenAI } from "@google/genai";
import { NOTETAKER_SYSTEM_PROMPT } from "~/data/system-prompts";

export async function createSummary(
  question: string,
  answer: string,
  suspect: string,
  env: EnvGetter,
) {
  const ai = new GoogleGenAI({ apiKey: env.get("GOOGLE_API_KEY") });

  const userPrompt = `
* **SUSPECT:** ${suspect}
* **QUESTION:** ${question}
* **STATEMENT:** ${answer}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: createUserContent(userPrompt),
    config: {
      systemInstruction: NOTETAKER_SYSTEM_PROMPT,
    },
  });
  return response.text;
}
