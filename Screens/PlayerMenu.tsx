import React from "react";
import Global from "../Styles/Global";
import PlayerView from "../Components/PlayerView/PlayerView";
import { View } from "react-native";

const PlayerMenu = () => {
  return (
    <View style={[Global.container]}>
      <PlayerView />
    </View>
  );
};

export default PlayerMenu;
