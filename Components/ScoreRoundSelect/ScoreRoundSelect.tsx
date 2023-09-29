import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";
import { RootStackParamList } from "../ScoreRoundSelector/ScoreRoundSelector";
import { StackScreenProps } from "@react-navigation/stack";
import { EmpireRoundScoring } from "../../types/EmpireScore";
import { EndgameScoring } from "../../types/EndgameScores";

type PlayerMenuScreenProps = StackScreenProps<RootStackParamList>;

type ScoreRoundSelectProps = PlayerMenuScreenProps;

const initialEmpireScore: EmpireRoundScoring = {
  hispania: 0,
  gaul: 0,
  italia: 0,
  greece: 0,
  assyria: 0,
  egpyt: 0,
  numidia: 0,
  government: 0,
};

const initialEndgameScore: EndgameScoring = {
  wonders: 0,
  cities: 0,
  towns: 0,
  manufactoryTowns: 0,
  goldenAges: 0,
  achievements: 0,
  projects: 0,
  technologies: 0,
  unrest: 0,
};

const ScoreRoundSelect = (props: ScoreRoundSelectProps) => {
  const { navigation } = props;
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("EmpireScoreCategoryInput", {
            draftEmpireScore: initialEmpireScore,
            roundNumber: 0,
          })
        }
      >
        Score Round 1
      </Button>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("EmpireScoreCategoryInput", {
            draftEmpireScore: initialEmpireScore,
            roundNumber: 1,
          })
        }
      >
        Score Round 2
      </Button>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("EmpireScoreCategoryInput", {
            draftEmpireScore: initialEmpireScore,
            roundNumber: 2,
          })
        }
      >
        Score Round 3
      </Button>
      <Button
        mode="contained"
        onPress={() =>
          navigation.navigate("EndgameScoreCategoryInput", {
            draftEndgameScore: initialEndgameScore,
          })
        }
      >
        Score Endgame
      </Button>
    </View>
  );
};

export default ScoreRoundSelect;
