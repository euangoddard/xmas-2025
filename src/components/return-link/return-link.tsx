import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export interface ReturnLinkProps {
  fromSuspect?: string;
}

export const ReturnLink = component$<ReturnLinkProps>(({ fromSuspect }) => {
  return (
    <>
      {fromSuspect ? (
        <Link
          href={`/interrogate/${fromSuspect}/`}
          class="font-mono text-sm text-red-800 hover:underline"
        >
          Return to Interrogation
        </Link>
      ) : (
        <Link
          href="/dossier/"
          class="font-mono text-sm text-red-800 hover:underline"
        >
          Return to Dossier
        </Link>
      )}
    </>
  );
});
