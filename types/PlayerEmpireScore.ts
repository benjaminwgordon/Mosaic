import { UUID } from "./id";

/**
 * PlayerScore represents a normalized relationship between a player and a score
 */
export type PlayerEmpireScore = {
  byId: {
    [id: UUID]: {
      id: UUID;
      playerId: UUID;
      empireScordID: number;
    };
  };
  allIds: UUID[];
};
