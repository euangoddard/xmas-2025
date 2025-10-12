import { component$ } from "@builder.io/qwik";

export interface UserMessageProps {
  message: string;
}

export const UserMessage = component$<UserMessageProps>(({ message }) => {
  return (
    <div class="p-transcript font-mono text-teal-900">
      <span class="font-bold uppercase">You:</span> {message}
    </div>
  );
});
