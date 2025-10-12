import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

interface CurrentFileSidebarProps {
  id: string;
  imgSrc: string;
  name: string;
  role: string;
  biography: string;
}

export const CurrentFileSidebar = component$<CurrentFileSidebarProps>(
  ({ id, imgSrc, name, role, biography }) => {
    return (
      <div class="sticky top-8 rounded-md bg-amber-50 p-6 text-zinc-800 shadow-lg">
        <h2 class="mb-4 font-mono text-sm tracking-widest text-teal-800 uppercase">
          Current File
        </h2>
        <div class="text-center">
          <img
            src={imgSrc}
            alt={`Portrait of ${name}`}
            class="mx-auto mb-4 w-1/2 rounded-sm shadow-md"
            width={400}
            height={400}
          />
          <h3 class="font-display mb-1 text-2xl text-red-900">{name}</h3>
          <p class="mb-4 text-base text-stone-600">{role}</p>
        </div>
        <hr class="my-4 border-stone-300" />
        <div>
          <h4 class="mb-2 font-bold">Biography:</h4>
          <p class="text-base leading-relaxed text-zinc-700">{biography}</p>
        </div>
        <div class="mt-6 text-center">
          <Link
            href={`/interrogate/${id}/`}
            class="w-full rounded-sm bg-red-800 px-6 py-3 font-mono tracking-wider text-stone-100 uppercase shadow-md transition-all duration-200 hover:bg-red-700 hover:shadow-lg focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-amber-50 focus:outline-none"
          >
            Interrogate
          </Link>
        </div>
      </div>
    );
  },
);
