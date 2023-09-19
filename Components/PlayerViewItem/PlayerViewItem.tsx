import React, { useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import {
  PlayerContext,
  PlayerDispatchContext,
} from "../../contexts/GameContext";
import {
  PlayerAction,
  PlayerDeleteAction,
  PlayerEditAction,
} from "../../reducers/PlayerReducer";
import { Player } from "../../types/Players";
import PlayerViewStyle from "./PlayerViewItemStyle";
import { UUID } from "../../types/id";

type PlayerViewItemProps = {
  playerId: UUID;
};

const PlayerViewItem = (props: PlayerViewItemProps) => {
  const { playerId } = props;
  const players = useContext(PlayerContext);
  const playerDispatch = useContext(PlayerDispatchContext);

  const submitPlayerDelete = () => {
    const dispatchAction: PlayerDeleteAction = {
      type: "DELETE",
      payload: {
        id: playerId,
      },
    };
    playerDispatch(dispatchAction);
  };

  const submitPlayerEdit = (updatedName: string) => {
    const dispatchAction: PlayerEditAction = {
      type: "EDIT",
      payload: {
        id: playerId,
        name: updatedName,
      },
    };
  };

  return (
    <View style={PlayerViewStyle.PlayerCard}>
      <TextInput
        style={{ marginLeft: 5 }}
        placeholder="player name..."
        onChangeText={(text) => {
          submitPlayerEdit(text);
        }}
      >
        {players.byId[playerId].name}
      </TextInput>
      <Button title={"Delete"} onPress={submitPlayerDelete} />
    </View>
  );
};

export default PlayerViewItem;
