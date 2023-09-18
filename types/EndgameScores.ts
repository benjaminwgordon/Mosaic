/**
 * EndgameScores is a normalized collection of each player's endgame scoring
 */

import { UUID } from "./id";

export type EndgameScores = {
  byId: { [id: UUID]: EndgameScoring };
  allId: UUID[];
};

type EndgameScoring = {
  wonders: number;
  cities: number;
  towns: number;
  manufactoryTowns: number;
  goldenAges: number;
  achievements: number;
  projects: number;
  technologies: number;
  unrest: number;
};
