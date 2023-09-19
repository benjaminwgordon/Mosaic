import { produce } from "immer";
import { UUID } from "../types/id";
import { Game } from "../contexts/GameContext";

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

  return produce(state, (draft) => {
    draft.entities.players.allIds.push(action.payload.newPlayer.id);
    draft.entities.players.byId[action.payload.newPlayer.id] =
      action.payload.newPlayer;
  });
};

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
