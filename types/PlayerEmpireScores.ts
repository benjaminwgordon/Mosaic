import { UUID } from "./id";

/**
 * PlayerScore represents a normalized relationship between a
 * player and their 3 rounds of empire scores
 */
export type PlayerEmpireScores = {
  byId: {
    [id: UUID]: {
      id: UUID;
      playerId: UUID;
      empireScoreID: UUID;
    };
  };
  allIds: UUID[];
};
