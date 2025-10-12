import { component$, QRL } from "@builder.io/qwik";

interface CaseFileCardProps {
  name: string;
  role: string;
  imgSrc: string;
  isActive: boolean;
  onSelect$: QRL<() => void>;
}

export const CaseFileCard = component$<CaseFileCardProps>(
  ({ name, role, imgSrc, isActive, onSelect$ }) => {
    return (
      <figure
        onClick$={onSelect$}
        class={`block rounded-sm border-2 bg-stone-100 shadow-md transition-all duration-300 hover:shadow-xl ${
          isActive
            ? "border-red-800 ring-2 ring-red-800/50"
            : "cursor-pointer border-transparent hover:ring-2 hover:ring-red-800/50"
        }`}
      >
        <img
          src={imgSrc}
          alt={`Portrait of ${name}`}
          class="h-auto w-full rounded-t-sm object-cover"
          width={400}
          height={400}
        />
        <div class="p-4">
          <h3 class="font-display text-xl text-red-900">{name}</h3>
          <p class="text-sm text-stone-600">{role}</p>
        </div>
      </figure>
    );
  },
);
