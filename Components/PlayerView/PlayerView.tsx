import React, { useContext } from "react";
import { FlatList, View } from "react-native";
import AddPlayer from "../AddPlayer/AddPlayer";
import PlayerViewItem from "../PlayerViewItem/PlayerViewItem";
import { useGame, useGameDispatch } from "../../contexts/GameContext";

const PlayerView = () => {
  const game = useGame();
  const gameDispatch = useGameDispatch();

  return (
    <View>
      <FlatList
        style={{ flexGrow: 0 }}
        data={game.entities.players.allIds}
        renderItem={({ item }) => <PlayerViewItem playerId={item} />}
      />
      <AddPlayer />
    </View>
  );
};

export default PlayerView;
