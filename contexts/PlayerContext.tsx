import { createContext, useReducer } from "react";
import { Players } from "../types/Players";
import { PlayerAction, playerReducer } from "../reducers/PlayerReducer";

export const PlayerContext = createContext<Players>(null);
export const PlayerDispatchContext =
  createContext<React.Dispatch<PlayerAction>>(null);

export const PlayerProvider = ({ children }) => {
  const initialPlayerState: Players = {
    byId: {},
    allIds: [],
  };

  const [players, playerDispatch] = useReducer(
    playerReducer,
    initialPlayerState
  );

  return (
    <PlayerContext.Provider value={players}>
      <PlayerDispatchContext.Provider value={playerDispatch}>
        {children}
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  );
};
