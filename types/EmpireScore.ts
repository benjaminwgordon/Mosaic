import { UUID } from "./id";

/**
 * There are 3 rounds of empire scoring during a game of mosaic
 *
 * EmpireScores represents a normalized state, where each entry
 * represents 3 full rounds of empire scoring
 */

export type EmpireScores = {
  byId: { [id: UUID]: EmpireScoring };
  allIds: UUID[];
};

export type EmpireScoring = [
  EmpireRoundScoring,
  EmpireRoundScoring,
  EmpireRoundScoring
];

export type EmpireRoundScoring = {
  hispania: number;
  gaul: number;
  italia: number;
  greece: number;
  assyria: number;
  egpyt: number;
  numidia: number;
  government: number;
};
