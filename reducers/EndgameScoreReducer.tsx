import { produce } from "immer";
import { Game } from "../contexts/GameContext";
import { UUID } from "../types/id";

export type EndgameScoreAction = EndgameScoreEditAction | EndgameScoreAddAction;

export type EndgameScoreActionEntity = {
  entity: "ENDGAME";
};

export type EndgameScoreEditAction = {
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
} & EndgameScoreActionEntity;

export type EndgameScoreAddAction = {
  type: "ENDGAME-ADD";
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
} & EndgameScoreActionEntity;

export const endgameScoreReducer = (
  state: Game,
  action: EndgameScoreAction
): Game => {
  switch (action.type) {
    case "ENDGAME-EDIT":
      return handleEndgameEdit(state, action);
    case "ENDGAME-ADD":
      return handleEndgameAdd(state, action);
  }
};

/**
 * Modies the state of a single endgame scoring entity, by replacing the value of
 * one of its scoringCategories
 *
 * for example, this could replace a player's achievements score with a new value
 */
const handleEndgameEdit = (state: Game, action: EndgameScoreEditAction) => {
  return produce(state, (draftState) => {
    const { playerId, scoreCategory, score } = action.payload;

    // fetch the player's related Endgame Score entity
    const playerScoreEntity = Object.values(
      draftState.entities.playerEndgameScores.byId
    ).find((playerEndgameScore) => playerEndgameScore.id == playerId);

    if (!playerScoreEntity) {
      throw Error(
        `no associated endgame score tracker for player with id: ${playerId}`
      );
    }

    // if a valid player <-> endgame score entity exists, follow the relation and fetch the endgame score entitty
    const endgameScoreEntityID = playerScoreEntity.endgameScoreId;
    const scoreEntityEntry = Object.entries(
      draftState.entities.endgameScores.byId
    ).find((scoreEntity) => scoreEntity[0] === endgameScoreEntityID);

    if (!scoreEntityEntry) {
      throw Error("no endgame was found with associated ID. This is a bug");
    }
    const scoreEntityID = scoreEntityEntry[0];

    // modify the endgameScoring
    switch (scoreCategory) {
      case "wonders":
        draftState.entities.endgameScores.byId[scoreEntityID].wonders = score;
      case "cities":
        draftState.entities.endgameScores.byId[scoreEntityID].cities = score;
      case "towns":
        draftState.entities.endgameScores.byId[scoreEntityID].towns = score;
      case "manufactoryTowns":
        draftState.entities.endgameScores.byId[scoreEntityID].manufactoryTowns =
          score;
      case "goldenAges":
        draftState.entities.endgameScores.byId[scoreEntityID].goldenAges =
          score;
      case "achievements":
        draftState.entities.endgameScores.byId[scoreEntityID].achievements =
          score;
      case "projects":
        draftState.entities.endgameScores.byId[scoreEntityID].projects = score;
      case "technologies":
        draftState.entities.endgameScores.byId[scoreEntityID].technologies =
          score;
      case "unrest":
        draftState.entities.endgameScores.byId[scoreEntityID].unrest = score;
    }
  });
};

/**
 * Modies the state of a single endgame scoring entity, by adding a value the current value of one of its scoringCategories
 *
 * for example, this could add 5 points to a player's achievements score
 */
const handleEndgameAdd = (state: Game, action: EndgameScoreAddAction) => {
  return produce(state, (draftState) => {
    const { playerId, scoreCategory, score } = action.payload;

    // fetch the player's related Endgame Score entity
    const playerScoreEntity = Object.values(
      draftState.entities.playerEndgameScores.byId
    ).find((playerEndgameScore) => playerEndgameScore.id == playerId);

    if (!playerScoreEntity) {
      throw Error(
        `no associated endgame score tracker for player with id: ${playerId}`
      );
    }

    // if a valid player <-> endgame score entity exists, follow the relation and fetch the endgame score entitty
    const endgameScoreEntityID = playerScoreEntity.endgameScoreId;
    const scoreEntityEntry = Object.entries(
      draftState.entities.endgameScores.byId
    ).find((scoreEntity) => scoreEntity[0] === endgameScoreEntityID);

    if (!scoreEntityEntry) {
      throw Error("no endgame was found with associated ID. This is a bug");
    }
    const scoreEntityID = scoreEntityEntry[0];

    // modify the endgameScoring
    switch (scoreCategory) {
      case "wonders":
        draftState.entities.endgameScores.byId[scoreEntityID].wonders += score;
      case "cities":
        draftState.entities.endgameScores.byId[scoreEntityID].cities += score;
      case "towns":
        draftState.entities.endgameScores.byId[scoreEntityID].towns += score;
      case "manufactoryTowns":
        draftState.entities.endgameScores.byId[
          scoreEntityID
        ].manufactoryTowns += score;
      case "goldenAges":
        draftState.entities.endgameScores.byId[scoreEntityID].goldenAges +=
          score;
      case "achievements":
        draftState.entities.endgameScores.byId[scoreEntityID].achievements +=
          score;
      case "projects":
        draftState.entities.endgameScores.byId[scoreEntityID].projects += score;
      case "technologies":
        draftState.entities.endgameScores.byId[scoreEntityID].technologies +=
          score;
      case "unrest":
        draftState.entities.endgameScores.byId[scoreEntityID].unrest += score;
    }
  });
};
