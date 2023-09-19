import { Players } from "../types/Players";
import { EmpireScores } from "../types/EmpireScore";
import { EndgameScores } from "../types/EndgameScores";
import { PlayerEmpireScores } from "../types/PlayerEmpireScores";
import { PlayerEndgameScores } from "../types/PlayerEndgameScores";
import { createContext, useContext, useReducer } from "react";
import { GameAction, GameReducer } from "../reducers/GameReducer";

/**
 * Game represents a global state for the full game of Mosaic
 */
export type Game = {
  entities: {
    players: Players;
    empireScores: EmpireScores;
    endgameScores: EndgameScores;
    playerEmpireScores: PlayerEmpireScores;
    playerEndgameScores: PlayerEndgameScores;
  };
};

const initializedGameState = {
  entities: {
    players: {
      byId: {},
      allIds: [],
    },
    empireScores: {
      byId: {},
      allIds: [],
    },
    endgameScores: {
      byId: {},
      allIds: [],
    },
    playerEmpireScores: {
      byId: {},
      allIds: [],
    },
    playerEndgameScores: {
      byId: {},
      allIds: [],
    },
  },
};

const GameContext = createContext<Game>(null);
const GameDispatchContext = createContext<React.Dispatch<GameAction>>(null);

export function useGame() {
  return useContext(GameContext);
}

export function useGameDispatch() {
  return useContext(GameDispatchContext);
}

export const GameProvider = ({ children }) => {
  const [game, gameDispatch] = useReducer(GameReducer, initializedGameState);

  return (
    <GameContext.Provider value={game}>
      <GameDispatchContext.Provider value={gameDispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};
