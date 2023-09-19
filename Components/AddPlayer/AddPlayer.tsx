import React from "react";
import { Button, View } from "react-native";
import uuid from "react-native-uuid";
import { PlayerAction } from "../../reducers/PlayerReducer";
import { UUID } from "../../types/id";
import { useGameDispatch } from "../../contexts/GameContext";

const AddPlayer = () => {
  const gameDispatch = useGameDispatch();

  const dispatchNewPlayer = () => {
    const newPlayerId = uuid.v4() as UUID;
    const newUserAction: PlayerAction = {
      type: "APPEND",
      entity: "PLAYER",
      payload: {
        newPlayer: {
          id: newPlayerId,
          name: "",
        },
      },
    };
    gameDispatch(newUserAction);
  };

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Button onPress={dispatchNewPlayer} title={"Add a player"} />
    </View>
  );
};

export default AddPlayer;
