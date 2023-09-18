import React, { useContext } from "react";
import { PlayerContext } from "../../contexts/PlayerContext";
import { FlatList, View } from "react-native";
import AddPlayer from "../AddPlayer/AddPlayer";
import PlayerViewItem from "../PlayerViewItem/PlayerViewItem";

const PlayerView = () => {
  const players = useContext(PlayerContext);

  return (
    <View>
      <FlatList
        style={{ flexGrow: 0 }}
        data={players.allIds}
        renderItem={({ item }) => <PlayerViewItem playerId={item} />}
      />
      <AddPlayer />
    </View>
  );
};

export default PlayerView;
