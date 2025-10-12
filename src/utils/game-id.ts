import { Cookie } from "@builder.io/qwik-city";
import { nanoid } from "nanoid";

export const getGameId = (cookie: Cookie): string => {
  const cookieValue = cookie.get("game-id")?.value;
  if (cookieValue) {
    return cookieValue;
  }
  const gameId = nanoid();
  cookie.set("game-id", gameId, {
    path: "/",
  });
  return gameId;
};
