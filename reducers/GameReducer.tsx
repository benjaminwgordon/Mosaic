import { Game } from "../contexts/GameContext";
import {
  EmpireScoreAction,
  EmpireScoreActionEntity,
  empireScoreReducer,
} from "./EmpireScoreReducer";
import {
  EndgameScoreAction,
  EndgameScoreActionEntity,
  endgameScoreReducer,
} from "./EndgameScoreReducer";
import {
  PlayerAction,
  PlayerActionEntity,
  playerReducer,
} from "./PlayerReducer";

export type GameAction = PlayerAction | EndgameScoreAction | EmpireScoreAction;

/**
 * Entities determine which resource type the action targets
 */
export type Entity =
  | PlayerActionEntity
  | EndgameScoreActionEntity
  | EmpireScoreActionEntity;

export const GameReducer = (state: Game, action: GameAction): Game => {
  switch (action.entity) {
    case "PLAYER":
      return playerReducer(state, action);
    case "ENDGAME":
      return endgameScoreReducer(state, action);
    case "EMPIRE":
      return empireScoreReducer(state, action);
  }
};
