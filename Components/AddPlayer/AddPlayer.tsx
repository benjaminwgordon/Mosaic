import React, { useContext, useState } from "react";
import { PlayerDispatchContext } from "../../contexts/GameContext";
import { Button, TextInput, View } from "react-native";
import uuid from "react-native-uuid";
import { PlayerAction } from "../../reducers/PlayerReducer";
import { UUID } from "../../types/id";

const AddPlayer = () => {
  const playerDispatch = useContext(PlayerDispatchContext);

  const dispatchNewUser = () => {
    const newPlayerId = uuid.v4() as UUID;
    const newUserAction: PlayerAction = {
      type: "APPEND",
      payload: {
        newPlayer: {
          id: newPlayerId,
          name: "",
        },
      },
    };
    playerDispatch(newUserAction);
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
      <Button onPress={dispatchNewUser} title={"Add a player"} />
    </View>
  );
};

export default AddPlayer;
