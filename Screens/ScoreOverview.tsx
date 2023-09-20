import React from "react";
import { Game, useGame } from "../contexts/GameContext";
import { DataTable } from "react-native-paper";
import { ScrollView, Text, View } from "react-native";
import EmpireScoreTable from "../Components/Scores/EmpireScore";

const ScoreOverview = () => {
  const game = useGame();
  const roundOrientedGameState = getRoundBasedGameState(game);

  return game.entities.players.allIds.length > 0 ? (
    <ScrollView>
      <EmpireScoreTable roundNumber={0} round={roundOrientedGameState.round1} />
      <EmpireScoreTable roundNumber={1} round={roundOrientedGameState.round2} />
      <EmpireScoreTable roundNumber={2} round={roundOrientedGameState.round3} />
    </ScrollView>
  ) : (
    <Text>Enter some players to see scores</Text>
  );
};

export default ScoreOverview;

const getRoundBasedGameState = (game: Game) => {
  const playerIds = game.entities.players.allIds;
  const denormalizedGameState = playerIds.map((playerId) => {
    // fetch player
    const player = Object.values(game.entities.players.byId).find(
      (player) => player.id == playerId
    );
    // fetch player's empire scores
    const empireScoreId = Object.values(
      game.entities.playerEmpireScores.byId
    ).find(
      (playerEmpireScore) => playerEmpireScore.playerId == playerId
    ).empireScoreID;
    const empireScore = game.entities.empireScores.byId[empireScoreId];
    const [round1EmpireScore, round2EmpireScore, round3EmpireScore] =
      empireScore;

    // fetch player's endgame scores
    const endgameScoreId = Object.values(
      game.entities.playerEndgameScores.byId
    ).find(
      (playerEndgameScore) => playerEndgameScore.playerId == playerId
    ).endgameScoreId;
    const endgameScore = game.entities.endgameScores.byId[endgameScoreId];

    return {
      player: player,
      round1Scores: round1EmpireScore,
      round2Scores: round2EmpireScore,
      round3Scores: round3EmpireScore,
      endgameScores: endgameScore,
    };
  });

  // break the data into individual rounds

  const round1 = denormalizedGameState.map((playerScores) => {
    return {
      player: playerScores.player,
      roundScores: playerScores.round1Scores,
    };
  });

  const round2 = denormalizedGameState.map((playerScores) => {
    return {
      player: playerScores.player,
      roundScores: playerScores.round2Scores,
    };
  });

  const round3 = denormalizedGameState.map((playerScores) => {
    return {
      player: playerScores.player,
      roundScores: playerScores.round3Scores,
    };
  });

  const endgame = denormalizedGameState.map((playerScores) => {
    return {
      player: playerScores,
      endGameScores: playerScores.endgameScores,
    };
  });

  return {
    round1,
    round2,
    round3,
    endgame,
  };
};
