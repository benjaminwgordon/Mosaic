import { produce } from "immer";
import { Players } from "../types/Players";
import { UUID } from "../types/id";

export type PlayerAction =
  | PlayerAppendAction
  | PlayerDeleteAction
  | PlayerEditAction;

export type PlayerDeleteAction = {
  type: "DELETE";
  payload: {
    id: UUID;
  };
};

export type PlayerAppendAction = {
  type: "APPEND";
  payload: {
    newPlayer: {
      id: UUID;
      name: string;
    };
  };
};

export type PlayerEditAction = {
  type: "EDIT";
  payload: {
    id: UUID;
    name: string;
  };
};

export const playerReducer = (
  state: Players,
  action: PlayerAction
): Players => {
  switch (action.type) {
    case "APPEND":
      return handlePlayerAppend(state, action);
    case "EDIT":
      return handlePlayerEdit(state, action);
    case "DELETE":
      return handlePlayerDelete(state, action);
  }
};

// to prevent side-effects inside the reducer, a random UUID must be generated BEFORE dispatch
const handlePlayerAppend = (state: Players, action: PlayerAppendAction) => {
  // Mosaic has a maximum of 6 players, reject appends over 6 players
  if (state.allIds.length >= 6) {
    return state;
  }

  return produce(state, (draft) => {
    draft.allIds.push(action.payload.newPlayer.id);
    draft.byId[action.payload.newPlayer.id] = action.payload.newPlayer;
  });
};

const handlePlayerEdit = (
  state: Players,
  action: PlayerEditAction
): Players => {
  const { id, name } = action.payload;
  console.log("name", { name });
  return produce(state, (draft) => {
    draft.byId[id].name = name;
  });
};

const handlePlayerDelete = (
  state: Players,
  action: PlayerDeleteAction
): Players => {
  const { id: targetPlayerId } = action.payload;
  return produce(state, (draft) => {
    draft.allIds = draft.allIds.filter((id) => id !== targetPlayerId);
    delete draft.byId[targetPlayerId];
  });
};
