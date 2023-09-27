import {
  Button,
  Card,
  Modal,
  Portal,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useGame, useGameDispatch } from "../../contexts/GameContext";
import { UUID } from "../../types/id";
import {
  EmpireScoreCategory,
  EmpireScoreEditAction,
} from "../../reducers/EmpireScoreReducer";
import { View } from "react-native";
import { useState } from "react";

type ScoreCellProps = {
  roundNumber: 0 | 1 | 2;
  categoryScore: number;
  playerId: UUID;
  empireScoringCategories: EmpireScoreCategory[];
  cellIndex: number;
};

const ScoreCell = (props: ScoreCellProps) => {
  const {
    cellIndex,
    empireScoringCategories,
    playerId,
    roundNumber,
    categoryScore,
  } = props;

  const game = useGame();
  const [isEditModalVisible, setIsModalVisible] = useState(false);
  const [scoreOverride, setScoreOverride] = useState(categoryScore.toString());
  const [formErrors, setFormErrors] = useState("");
  const toggleModalVisible = () => {
    setIsModalVisible(!isEditModalVisible);
  };
  const { colors } = useTheme();

  const playerName = Object.values(game.entities.players.byId).find(
    (player) => player.id == playerId
  ).name;

  const gameDispatch = useGameDispatch();

  const dispatchEmpireScoreEdit = (
    playerID: UUID,
    scoreCategory: EmpireScoreCategory,
    score: string
  ) => {
    // score input is string based, check for valid
    // parsable int and throw UI error if not parsable

    const strRegex = new RegExp(/^[0-9]+$/i);
    const isScoreNumeric = strRegex.test(score);

    if (!isScoreNumeric) {
      setFormErrors("Input a number");
      return;
    }

    const parsed = parseInt(score);

    setIsModalVisible(false);

    const empireScoreEditDispatchAction: EmpireScoreEditAction = {
      type: "EMPIRE-EDIT",
      entity: "EMPIRE",
      payload: {
        playerId: playerID,
        round: roundNumber,
        scoreCategory: scoreCategory,
        score: parsed,
      },
    };
    gameDispatch(empireScoreEditDispatchAction);
  };

  return (
    <View
      style={{
        justifyContent: "center",
      }}
    >
      <Text onPress={() => toggleModalVisible()} style={{ fontSize: 16 }}>
        {categoryScore.toString()}
      </Text>
      <Portal>
        <Modal visible={isEditModalVisible} onDismiss={toggleModalVisible}>
          <Card
            style={{
              height: 280,
              borderRadius: 10,
              backgroundColor: colors.surfaceVariant,
              margin: 20,
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              variant="titleLarge"
              style={{ textAlign: "center", marginBottom: 5 }}
            >
              Override {playerName}'s Round {roundNumber + 1}{" "}
              {empireScoringCategories[cellIndex].charAt(0).toUpperCase() +
                empireScoringCategories[cellIndex].substring(1)}{" "}
              score?
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 24 }}>{categoryScore}</Text>
              <Text>{"->"}</Text>
              <TextInput
                keyboardType="numeric"
                mode="outlined"
                maxLength={2}
                onChangeText={(text) => setScoreOverride(text)}
                value={scoreOverride.toString()}
                style={{ fontSize: 20, textAlign: "center" }}
              />
            </View>
            <Text
              style={{
                color: colors.error,
                textAlign: "center",
                marginVertical: 5,
              }}
            >
              {formErrors}
            </Text>
            <View
              style={{
                margin: 10,
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 10,
                width: 250,
              }}
            >
              <Button
                mode={"contained"}
                onPress={() => {
                  dispatchEmpireScoreEdit(
                    playerId,
                    empireScoringCategories[cellIndex],
                    scoreOverride
                  );
                }}
              >
                Override
              </Button>
              <Button
                mode={"outlined"}
                onPress={() => setIsModalVisible(false)}
              >
                Cancel
              </Button>
            </View>
          </Card>
        </Modal>
      </Portal>
    </View>
  );
};

export default ScoreCell;
