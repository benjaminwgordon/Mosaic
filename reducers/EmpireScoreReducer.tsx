import { produce } from "immer";
import { Game } from "../contexts/GameContext";
import { UUID } from "../types/id";

export type EmpireScoreAction = EmpireScoreEditAction | EmpireScoreAddAction;

export type EmpireScoreActionEntity = {
  entity: "EMPIRE";
};

export type EmpireScoreCategory =
  | "hispania"
  | "gaul"
  | "italia"
  | "greece"
  | "assyria"
  | "egpyt"
  | "numidia"
  | "government";

export type EmpireScoreEditAction = {
  type: "EMPIRE-EDIT";
  payload: {
    playerId: UUID;
    round: 0 | 1 | 2;
    scoreCategory: EmpireScoreCategory;
    score: number;
  };
} & EmpireScoreActionEntity;

export type EmpireScoreAddAction = {
  type: "EMPIRE-ADD";
  payload: {
    playerId: UUID;
    round: 0 | 1 | 2;
    scoreCategory:
      | "hispania"
      | "gaul"
      | "italia"
      | "greece"
      | "assyria"
      | "egpyt"
      | "numidia"
      | "government";
    score: number;
  };
} & EmpireScoreActionEntity;

export const empireScoreReducer = (
  state: Game,
  action: EmpireScoreAction
): Game => {
  switch (action.type) {
    case "EMPIRE-EDIT":
      return handleEmpireEdit(state, action);
    case "EMPIRE-ADD":
      return handleEmpireAdd(state, action);
  }
};

/**
 * Modies the state of a single empire scoring entity, by replacing the value of
 * one of its scoringCategories
 *
 * for example, this could replace a player's achievements score with a new value
 */
const handleEmpireEdit = (state: Game, action: EmpireScoreEditAction) => {
  return produce(state, (draftState) => {
    const { round, playerId, scoreCategory, score } = action.payload;

    // fetch the player's related Empire Score entity
    const playerScoreEntity = Object.values(
      draftState.entities.playerEmpireScores.byId
    ).find((playerEmpireScore) => playerEmpireScore.playerId == playerId);

    if (!playerScoreEntity) {
      throw Error(
        `no associated empire score tracker for player with id: ${playerId}`
      );
    }

    // if a valid player <-> empire score entity exists, follow the relation and fetch the empire score entitty
    const empireScoreEntityID = playerScoreEntity.empireScoreID;
    const scoreEntityEntry = Object.entries(
      draftState.entities.empireScores.byId
    ).find((scoreEntity) => scoreEntity[0] === empireScoreEntityID);

    if (!scoreEntityEntry) {
      throw Error("no empire was found with associated ID. This is a bug");
    }
    const scoreEntityID = scoreEntityEntry[0];

    // modify the empireScoring
    switch (scoreCategory) {
      case "hispania":
        draftState.entities.empireScores.byId[scoreEntityID][round].hispania =
          score;
        break;
      case "gaul":
        draftState.entities.empireScores.byId[scoreEntityID][round].gaul =
          score;
        break;
      case "italia":
        draftState.entities.empireScores.byId[scoreEntityID][round].italia =
          score;
        break;
      case "greece":
        draftState.entities.empireScores.byId[scoreEntityID][round].greece =
          score;
        break;
      case "assyria":
        draftState.entities.empireScores.byId[scoreEntityID][round].assyria =
          score;
        break;
      case "egpyt":
        draftState.entities.empireScores.byId[scoreEntityID][round].egpyt =
          score;
        break;
      case "numidia":
        draftState.entities.empireScores.byId[scoreEntityID][round].numidia =
          score;
        break;
      case "government":
        draftState.entities.empireScores.byId[scoreEntityID][round].government =
          score;
        break;
    }
  });
};

/**
 * Modies the state of a single empire scoring entity, by adding a value the current value of one of its scoringCategories
 *
 * for example, this could add 5 points to a player's achievements score
 */
const handleEmpireAdd = (state: Game, action: EmpireScoreAddAction) => {
  return produce(state, (draftState) => {
    const { round, playerId, scoreCategory, score } = action.payload;

    // fetch the player's related Empire Score entity
    const playerScoreEntity = Object.values(
      draftState.entities.playerEmpireScores.byId
    ).find((playerEmpireScore) => playerEmpireScore.id == playerId);

    if (!playerScoreEntity) {
      throw Error(
        `no associated empire score tracker for player with id: ${playerId}`
      );
    }

    // if a valid player <-> empire score entity exists, follow the relation and fetch the empire score entitty
    const empireScoreEntityID = playerScoreEntity.empireScoreID;
    const scoreEntityEntry = Object.entries(
      draftState.entities.empireScores.byId
    ).find((scoreEntity) => scoreEntity[0] === empireScoreEntityID);

    if (!scoreEntityEntry) {
      throw Error("no empire was found with associated ID. This is a bug");
    }
    const scoreEntityID = scoreEntityEntry[0];

    switch (scoreCategory) {
      case "hispania":
        draftState.entities.empireScores.byId[scoreEntityID][round].hispania +=
          score;
        break;
      case "gaul":
        draftState.entities.empireScores.byId[scoreEntityID][round].gaul +=
          score;
        break;
      case "italia":
        draftState.entities.empireScores.byId[scoreEntityID][round].italia +=
          score;
        break;
      case "greece":
        draftState.entities.empireScores.byId[scoreEntityID][round].greece +=
          score;
        break;
      case "assyria":
        draftState.entities.empireScores.byId[scoreEntityID][round].assyria +=
          score;
        break;
      case "egpyt":
        draftState.entities.empireScores.byId[scoreEntityID][round].egpyt +=
          score;
        break;
      case "numidia":
        draftState.entities.empireScores.byId[scoreEntityID][round].numidia +=
          score;
        break;
      case "government":
        draftState.entities.empireScores.byId[scoreEntityID][
          round
        ].government += score;
        break;
    }
  });
};
