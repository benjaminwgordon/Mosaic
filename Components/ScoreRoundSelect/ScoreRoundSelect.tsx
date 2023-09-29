import React from "react";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

const ScoreRoundSelect = ({ navigation }) => {
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
        onPress={() => navigation.navigate("EmpireScoreCategoryInput", {})}
      >
        Score Round 1
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("EmpireScoreCategoryInput", {})}
      >
        Score Round 2
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("EmpireScoreCategoryInput", {})}
      >
        Score Round 3
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("EndgameScoreCategoryInput", {})}
      >
        Score Endgame
      </Button>
    </View>
  );
};

export default ScoreRoundSelect;
