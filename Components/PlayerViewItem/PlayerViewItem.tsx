import React, { useContext } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { useGame, useGameDispatch } from "../../contexts/GameContext";
import {
  PlayerDeleteAction,
  PlayerEditAction,
} from "../../reducers/PlayerReducer";
import PlayerViewStyle from "./PlayerViewItemStyle";
import { UUID } from "../../types/id";

type PlayerViewItemProps = {
  playerId: UUID;
};

const PlayerViewItem = (props: PlayerViewItemProps) => {
  const { playerId } = props;
  const game = useGame();
  const gameDispatch = useGameDispatch();

  const submitPlayerDelete = () => {
    const dispatchAction: PlayerDeleteAction = {
      type: "DELETE",
      entity: "PLAYER",
      payload: {
        id: playerId,
      },
    };
    gameDispatch(dispatchAction);
  };

  const submitPlayerEdit = (updatedName: string) => {
    const dispatchAction: PlayerEditAction = {
      type: "EDIT",
      entity: "PLAYER",
      payload: {
        id: playerId,
        name: updatedName,
      },
    };
    gameDispatch(dispatchAction);
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
        {game.entities.players.byId[playerId].name}
      </TextInput>
      <Button title={"Delete"} onPress={submitPlayerDelete} />
    </View>
  );
};

export default PlayerViewItem;
