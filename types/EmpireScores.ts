import { UUID } from "./id";

export type EmpireScores = {
  byId: { [id: UUID]: EmpireScoring };
  allIds: UUID[];
};

type EmpireScoring = [
  EmpireRoundScoring,
  EmpireRoundScoring,
  EmpireRoundScoring
];

type EmpireRoundScoring = {
  hispania: number;
  gaul: number;
  italia: number;
  greece: number;
  assyria: number;
  egpyt: number;
  numidia: number;
  government: number;
};
