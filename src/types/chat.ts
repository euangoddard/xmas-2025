export const enum Role {
  User = "user",
  Assistant = "assistant",
}

export interface ChatTurn {
  id: string;
  role: Role;
  content: string;
}

export type ChatTurns = ChatTurn[];

export interface Chat {
  id: string;
  turns: ChatTurns;
}
