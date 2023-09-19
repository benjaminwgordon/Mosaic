import React from "react";
import { UUID } from "../../types/id";
import { View, Text, FlatList } from "react-native";
import { useGame } from "../../contexts/GameContext";
import EmpireScore from "./EmpireScore";

type PlayerScoreListProps = {
  playerId: UUID;
};

const PlayerScoreList = (props: PlayerScoreListProps) => {
  const game = useGame();

  const { playerId } = props;

  // fetch player
  const player = game.entities.players.byId[playerId];

  // fetch empire scores
  const empireScoreId = Object.values(
    game.entities.playerEmpireScores.byId
  ).find(
    (playerEmpireScore) => playerEmpireScore.playerId == playerId
  ).empireScoreID;
  const empireScore = game.entities.empireScores.byId[empireScoreId];

  // fetch endgame scores
  const endgameScoreId = Object.values(
    game.entities.playerEmpireScores.byId
  ).find(
    (playerEmpireScore) => playerEmpireScore.playerId == playerId
  ).empireScoreID;
  const endgameScore = game.entities.endgameScores.byId[endgameScoreId];

  return (
    <View style={{ width: 50 }}>
      <Text style={{ fontSize: 20 }}>{player.name}</Text>
      <FlatList
        data={empireScore}
        renderItem={(item) => <EmpireScore empireScore={item.item} />}
      />
    </View>
  );
};

export default PlayerScoreList;
