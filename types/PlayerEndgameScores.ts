import { UUID } from "./id";

/**
 * PlayerScore represents a normalized relationship between a player
 * and their endgame score
 */
export type PlayerEndgameScores = {
  byId: {
    [id: UUID]: {
      id: UUID;
      playerId: UUID;
      endgameScoreId: UUID;
    };
  };
  allIds: UUID[];
};
