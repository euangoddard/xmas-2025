import type { SuspectDetail } from "~/types/person";

export const PEOPLE: readonly SuspectDetail[] = [
  {
    id: "beatrice",
    name: "Lady Beatrice Finchley",
    role: "The Young Wife",
    imgSrc: "/avatars/beatrice.jpg",
    biography: `Age 35. Alistair's second wife, married for five years. A former art gallery curator, her beauty and elegance seem out of place against the grim backdrop of the manor. She is perpetually anxious and carries herself with a tragic air. Most of the family views her as a gold-digger who is waiting for Alistair to die.`,
  },
  {
    id: "marcus",
    name: "Marcus Finchley",
    role: "The Disinherited Son",
    imgSrc: "/avatars/marcus.jpg",
    biography: `Age 45. Alistair's only son. A talented but commercially unsuccessful artist who lives a bohemian lifestyle in London. He was officially disowned ten years ago after refusing to join the family's investment firm. He is drowning in debt and has returned to Blackwood Manor for the first time in years, under the pretense of a Christmas reconciliation.
`,
  },
  {
    id: "eleanor",
    name: "Eleanor Ashford",
    role: "The Ambitious Daughter",
    imgSrc: "/avatars/eleanor.jpg",
    biography: `Age 42. Alistair's daughter. She is sharp, cold, and utterly obsessed with social status. She is married to a rising politician whose career she manages with ruthless efficiency. Her lifestyle and her husband's political campaigns are secretly bankrolled by her father.`,
  },
  {
    id: "hobbs",
    name: "Mr. Hobbs",
    role: "The Loyal Butler",
    imgSrc: "/avatars/hobbs.jpg",
    biography: `Age 64. Hobbs has been in service at Blackwood Manor for over forty years, first as a footman and for the last two decades as the butler. He is the epitome of professionalism: stoic, observant, and seemingly invisible. His loyalty to the estate — and to the memory of the first Lady Finchley — is absolute.`,
  },
  {
    id: "isabelle",
    name: "Dr. Isabelle Vance",
    role: "The Family Doctor",
    imgSrc: "/avatars/isabelle.jpg",
    biography: `Age 38. The local GP for the nearby village. For the past few years, she has also served as the private physician for Lord Finchley, making regular house calls to manage his heart condition. She is known for her calm, professional demeanor and compassionate nature. She was invited to Christmas Eve dinner as a courtesy.`,
  },
];
