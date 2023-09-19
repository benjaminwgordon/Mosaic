import { produce } from "immer";
import { UUID } from "../types/id";
import { Game } from "../contexts/GameContext";
import uuid from "react-native-uuid";
import { EmpireScoring } from "../types/EmpireScore";
import { EndgameScoring } from "../types/EndgameScores";

export type PlayerAction =
  | PlayerAppendAction
  | PlayerDeleteAction
  | PlayerEditAction;

export type PlayerActionEntity = {
  entity: "PLAYER";
};

export type PlayerDeleteAction = {
  type: "DELETE";
  payload: {
    id: UUID;
  };
} & PlayerActionEntity;

export type PlayerAppendAction = {
  type: "APPEND";
  payload: {
    newPlayer: {
      id: UUID;
      name: string;
    };
  };
} & PlayerActionEntity;

export type PlayerEditAction = {
  type: "EDIT";
  payload: {
    id: UUID;
    name: string;
  };
} & PlayerActionEntity;

export const playerReducer = (state: Game, action: PlayerAction): Game => {
  switch (action.type) {
    case "APPEND":
      return handlePlayerAppend(state, action);
    case "EDIT":
      return handlePlayerEdit(state, action);
    case "DELETE":
      return handlePlayerDelete(state, action);
  }
};

const handlePlayerAppend = (state: Game, action: PlayerAppendAction): Game => {
  // Mosaic has a maximum of 6 players, reject appends over 6 players
  if (state.entities.players.allIds.length >= 6) {
    return state;
  }

  /**
   * Creates a new player entity, and also their associated scorecards (endgame and empire)
   */
  return produce(state, (draft) => {
    // generate player entity
    draft.entities.players.allIds.push(action.payload.newPlayer.id);
    draft.entities.players.byId[action.payload.newPlayer.id] =
      action.payload.newPlayer;

    const initializedEmpireScorecard: EmpireScoring = [
      {
        hispania: 0,
        gaul: 0,
        italia: 0,
        greece: 0,
        assyria: 0,
        egpyt: 0,
        numidia: 0,
        government: 0,
      },
      {
        hispania: 0,
        gaul: 0,
        italia: 0,
        greece: 0,
        assyria: 0,
        egpyt: 0,
        numidia: 0,
        government: 0,
      },
      {
        hispania: 0,
        gaul: 0,
        italia: 0,
        greece: 0,
        assyria: 0,
        egpyt: 0,
        numidia: 0,
        government: 0,
      },
    ];

    const initializedEndgameScoreCard: EndgameScoring = {
      wonders: 0,
      cities: 0,
      towns: 0,
      manufactoryTowns: 0,
      goldenAges: 0,
      achievements: 0,
      projects: 0,
      technologies: 0,
      unrest: 0,
    };

    // generate player's empire scorecard
    const empireScoreID = uuid.v4() as UUID;
    draft.entities.empireScores.allIds.push(empireScoreID);
    draft.entities.empireScores.byId[empireScoreID] =
      initializedEmpireScorecard;

    // generate the relation between the player and their empire scorecard
    const playerEmpireScoreID = uuid.v4() as UUID;
    draft.entities.playerEmpireScores.allIds.push(playerEmpireScoreID);
    draft.entities.playerEmpireScores.byId[playerEmpireScoreID] = {
      id: playerEmpireScoreID,
      playerId: action.payload.newPlayer.id,
      empireScoreID: empireScoreID,
    };

    // generate the endgame scorecard
    const endgameScoreID = uuid.v4() as UUID;
    draft.entities.endgameScores.allIds.push(endgameScoreID);
    draft.entities.endgameScores.byId[endgameScoreID] =
      initializedEndgameScoreCard;

    // generate the relation between the player and their endgame scorecard
    const playerEndgameScoreID = uuid.v4() as UUID;
    draft.entities.playerEndgameScores.allIds.push(playerEndgameScoreID);
    draft.entities.playerEndgameScores.byId[playerEndgameScoreID] = {
      id: playerEndgameScoreID,
      playerId: action.payload.newPlayer.id,
      endgameScoreId: endgameScoreID,
    };
  });
};

// TODO: cascade deletes on relations
const handlePlayerEdit = (state: Game, action: PlayerEditAction): Game => {
  const { id, name } = action.payload;
  console.log("name", { name });
  return produce(state, (draft) => {
    draft.entities.players.byId[id].name = name;
  });
};

const handlePlayerDelete = (state: Game, action: PlayerDeleteAction): Game => {
  const { id: targetPlayerId } = action.payload;
  return produce(state, (draft) => {
    draft.entities.players.allIds = draft.entities.players.allIds.filter(
      (id) => id !== targetPlayerId
    );
    delete draft.entities.players.byId[targetPlayerId];
  });
};
