import { EnvGetter } from "@builder.io/qwik-city/middleware/request-handler";
import { createUserContent, GoogleGenAI } from "@google/genai";
import { ACCUSATION_SYSTEM_PROMPT } from "~/data/system-prompts";
import type { AdjudicationResult } from "~/types/adjudication-result";

export async function adjudicate(
  accused: string,
  method: string,
  motive: string,
  env: EnvGetter,
): Promise<AdjudicationResult> {
  const ai = new GoogleGenAI({ apiKey: env.get("GOOGLE_API_KEY") });
  const prompt = `The player has made the following accusation:

  **Accused Suspect:** ${accused}
  **Method of Death:** ${method}
  **Motive:** ${motive}

  Based on this information, please provide an assessment of the case.`;

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: createUserContent(prompt),
    config: {
      systemInstruction: ACCUSATION_SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          isCaseSolved: {
            type: "BOOLEAN",
            description: "True if the case is solved, otherwise false.",
          },
          killerAssessment: {
            type: "STRING",
            description: "Assessment of the accused killer.",
          },
          methodAssessment: {
            type: "STRING",
            description: "Assessment of the proposed murder method.",
          },
          motiveAssessment: {
            type: "STRING",
            description: "Assessment of the proposed motive.",
          },
          finalVerdict: {
            type: "STRING",
            description: "The final, in-character verdict and explanation.",
          },
        },
        required: [
          "isCaseSolved",
          "killerAssessment",
          "methodAssessment",
          "motiveAssessment",
          "finalVerdict",
        ],
      },
    },
  });

  const responseObject = JSON.parse(result.text ?? "{}");
  return responseObject;
}
