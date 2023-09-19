import React from "react";
import { View, Text, FlatList } from "react-native";
import { useGame } from "../contexts/GameContext";
import PlayerScoreList from "../Components/Scores/PlayerScoreList";

const ScoreOverview = () => {
  const game = useGame();

  // denormalize state
  const playerIds = game.entities.players.allIds;

  return (
    <FlatList
      contentContainerStyle={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
      data={playerIds}
      renderItem={({ item }) => <PlayerScoreList playerId={item} />}
    />
  );
};

export default ScoreOverview;
