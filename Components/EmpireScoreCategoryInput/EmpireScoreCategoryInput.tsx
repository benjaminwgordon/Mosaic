import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { RootStackParamList } from "../ScoreRoundSelector/ScoreRoundSelector";

// This component represents each of the category score inputs in a full round of Empire Scoring
// e.g. "hispania", "gaul","italia","greece","assyria","egpyt","numidia","government",
// If the user navigates through a full scoring, 8 of this component will be pushed to the stack

// each subsequent stack push takes an option which is the partially built draft EmpireScoring
// On the final stack push, the draft state is rectified with the existing real state, and the whole
// stack is collapsed back to the root, and the user is navigated to the scores screen

type EmpireScoreCategoryInputProps = StackScreenProps<
  RootStackParamList,
  "EmpireScoreCategoryInput"
>;

const EmpireScoreCategoryInput = (props: EmpireScoreCategoryInputProps) => {
  const { navigation, route } = props;
  console.log("params");
  console.log(route.params.draftEmpireScore);
  return (
    <View>
      <Text>Empire Score Category Input</Text>
    </View>
  );
};

export default EmpireScoreCategoryInput;
