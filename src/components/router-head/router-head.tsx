import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Playfair+Display:wght@700&family=Roboto+Mono&display=swap"
        rel="stylesheet"
      />
      <meta property="og:url" content="https://xmas-2025.euans.space/" />
      <meta
        property="og:title"
        content="A Holly & Ivy Killing - A Christmas Murder Mystery"
      />
      <meta
        property="og:description"
        content="Solve the festive murder at Blackwood Manor. Interrogate suspects, uncover secrets, and reveal the killer in this classic Agatha Christie-style whodunit."
      />
      <meta
        property="og:image"
        content="https://xmas-2025.euans.space/holly-and-ivy.webp"
      />
      <meta property="og:image:width" content="640" />
      <meta property="og:image:height" content="640" />

      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.style })}
        />
      ))}

      {head.scripts.map((s) => (
        <script
          key={s.key}
          {...s.props}
          {...(s.props?.dangerouslySetInnerHTML
            ? {}
            : { dangerouslySetInnerHTML: s.script })}
        />
      ))}
    </>
  );
});
