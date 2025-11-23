import { component$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { PEOPLE } from "~/data/people";

export const MobileNav = component$(() => {
  const loc = useLocation();
  const currentPath = loc.url.pathname;
  const fromSuspect = loc.url.searchParams.get("from");

  // Determine the suspect to link to for "Interrogate"
  let suspectId: string = PEOPLE[0].id;
  if (currentPath.startsWith("/interrogate/")) {
    const parts = currentPath.split("/");
    if (parts[2]) {
      suspectId = parts[2];
    }
  } else if (fromSuspect) {
    suspectId = fromSuspect;
  }

  const navItems = [
    {
      label: "Dossier",
      href: "/dossier/",
      isActive: currentPath.startsWith("/dossier/"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      label: "Interrogate",
      href: `/interrogate/${suspectId}/`,
      isActive: currentPath.startsWith("/interrogate/"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
    {
      label: "Notepad",
      href: `/notepad/?from=${suspectId}`,
      isActive: currentPath.startsWith("/notepad/"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      ),
    },
    {
      label: "Hints",
      href: `/hints/?from=${suspectId}`,
      isActive: currentPath.startsWith("/hints/"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2v1" />
          <path d="M12 7v5" />
          <path d="M12 13h.01" />
          <path d="M20 11a8.1 8.1 0 0 0-15.5-2" />
          <path d="M17 17v-4" />
          <path d="M21 15a2 2 0 0 1-2 2" />
        </svg>
      ),
    },
    {
      label: "Accuse",
      href: "/accuse/",
      isActive: currentPath.startsWith("/accuse/"),
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
          <path d="M7 21h10" />
          <path d="M12 3v18" />
          <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
        </svg>
      ),
    },
  ];

  return (
    <nav class="fixed bottom-0 left-0 right-0 z-50 block border-t border-stone-800 bg-stone-900 pb-safe md:hidden">
      <div class="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            class={`flex flex-col items-center py-3 text-xs font-medium transition-colors ${
              item.isActive
                ? "text-amber-400"
                : "text-stone-400 hover:text-stone-200"
            }`}
          >
            <div class="mb-1">{item.icon}</div>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
});
