import { component$ } from "@builder.io/qwik";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import type { Suspect } from "~/types/person";

export interface SuspectMessageProps {
  suspect: Suspect;
  message: string;
}

export const SuspectMessage = component$<SuspectMessageProps>(
  ({ suspect, message }) => {
    const html =
      `<span class="font-bold not-italic uppercase">${suspect.name}:</span>` +
      unified()
        .use(remarkParse)
        .use([])
        .use(remarkRehype)
        .use(rehypeStringify)
        .processSync(message)
        .toString();
    return (
      <div class="p-transcript prose" dangerouslySetInnerHTML={html}></div>
    );
  },
);
