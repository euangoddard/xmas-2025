export type SuspectIds =
  | "beatrice"
  | "marcus"
  | "eleanor"
  | "hobbs"
  | "isabelle";

export interface Suspect {
  id: SuspectIds;
  name: string;
  role: string;
}

export interface SuspectDetail extends Suspect {
  imgSrc: string;
  biography: string;
}

export type Suspects = readonly Suspect[];
