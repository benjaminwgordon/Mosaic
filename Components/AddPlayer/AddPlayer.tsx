import React, { useRef } from "react";
import uuid from "react-native-uuid";
import { PlayerAction } from "../../reducers/PlayerReducer";
import { UUID } from "../../types/id";
import { useGame, useGameDispatch } from "../../contexts/GameContext";
import { AnimatedFAB, IconButton, useTheme } from "react-native-paper";
import { Animated } from "react-native";

const AddPlayer = () => {
  const gameDispatch = useGameDispatch();
  const game = useGame();
  const { colors } = useTheme();
  const isMaxPlayers = game.entities.players.allIds.length === 6;

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
    <AnimatedFAB
      icon={"account-plus-outline"}
      onPress={dispatchNewPlayer}
      label={"Add Player"}
      extended={false}
      color={isMaxPlayers ? colors.error : colors.primary}
      style={{ position: "absolute", bottom: 16, right: 16 }}
    />
  );
};

export default AddPlayer;
