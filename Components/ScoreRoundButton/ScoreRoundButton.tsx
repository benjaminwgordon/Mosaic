import React from "react";
import { useGameDispatch } from "../../contexts/GameContext";
import { Button } from "react-native-paper";

type ScoreRoundButtonProps = {
  roundNumber: number;
};

const ScoreRoundButton = (props: ScoreRoundButtonProps) => {
  const { roundNumber } = props;
  const gameDispatch = useGameDispatch();

  return <Button onPress={() => {}}>{`Empire Round ${roundNumber}`}</Button>;
};

export default ScoreRoundButton;
