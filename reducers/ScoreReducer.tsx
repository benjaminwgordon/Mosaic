import { UUID } from "../types/id";
import { PlayerEmpireScore } from "../types/PlayerEmpireScore";

export type ScoreAction = EmpireScoreEditAction | EndgameScoreEditAction;

export type EndgameScoreEditAction = {
  type: "EMPIRE-EDIT";
  payload: {
    playerId: UUID;
    roundNumber: 1 | 2 | 3;
    scoreCategory:
      | "Hispania"
      | "Gaul"
      | "Italia"
      | "Greece"
      | "Assyria"
      | "Egpyt"
      | "Numidia"
      | "Government";
    score: number;
  };
};
export type EmpireScoreEditAction = {
  type: "ENDGAME-EDIT";
  payload: {
    playerId: UUID;
    scoreCategory:
      | "wonders"
      | "cities"
      | "towns"
      | "manufactoryTowns"
      | "goldenAges"
      | "achievements"
      | "projects"
      | "technologies"
      | "unrest";
    score: number;
  };
};

const EmpireScoreReducer = (state: PlayerEmpireScore, action: ScoreAction) => {
  switch (action.type) {
    case "ENDGAME-EDIT":
      handleEndgameScoreEdit(state, action);
    case "EMPIRE-EDIT":
      handleEmpireScoreEdit(state, action);
  }
};

const handleEmpireScoreEdit = (
  state: PlayerEmpireScore,
  action: EmpireScoreEditAction
): PlayerEmpireScore => {};

const handleEndgameScoreEdit = (
  state: PlayerEndgameScore,
  action: EmpireScoreEditAction
): PlayerEmpireScore => {};
