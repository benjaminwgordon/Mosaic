import { UUID } from "./id";

export type Player = {
  id: UUID;
  name: string;
};

/**
 * Players is a normalized collection of all players in the current game, organized by ID
 */
export type Players = {
  byId: { [id: UUID]: Player };
  allIds: UUID[];
};
