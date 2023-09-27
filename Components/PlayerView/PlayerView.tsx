import React, { useContext } from "react";
import { FlatList, ScrollView, View } from "react-native";
import AddPlayer from "../AddPlayer/AddPlayer";
import PlayerViewItem from "../PlayerViewItem/PlayerViewItem";
import { useGame, useGameDispatch } from "../../contexts/GameContext";
import { useTheme } from "react-native-paper";

const PlayerView = () => {
  const game = useGame();
  const { colors } = useTheme();

  return (
    <View style={{ height: "100%" }}>
      <FlatList
        style={{
          flexGrow: 0,
          height: "100%",
        }}
        contentContainerStyle={{
          justifyContent: "flex-start",
        }}
        data={game.entities.players.allIds}
        renderItem={({ item }) => <PlayerViewItem playerId={item} />}
      />
      <AddPlayer />
    </View>
  );
};

export default PlayerView;
