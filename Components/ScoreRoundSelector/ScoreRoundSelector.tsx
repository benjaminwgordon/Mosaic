import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { useTheme } from "react-native-paper";
import EmpireScoreCategoryInput from "../EmpireScoreCategoryInput/EmpireScoreCategoryInput";
import EndgameScoreCategoryInput from "../EndgameScoreCategoryInput/EndgameScoreCategoryInput";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import ScoreRoundSelect from "../ScoreRoundSelect/ScoreRoundSelect";
import { EmpireRoundScoring } from "../../types/EmpireScore";
import { RootTabParamList } from "../../App";
import { EndgameScoring } from "../../types/EndgameScores";

// exported type for the nested Stack Navigator route params
export type RootStackParamList = {
  RoundSelect: undefined;
  EmpireScoreCategoryInput: {
    draftEmpireScore: EmpireRoundScoring;
    roundNumber: 0 | 1 | 2;
  };
  EndgameScoreCategoryInput: {
    draftEndgameScore: EndgameScoring;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const ScoreRoundSelector = () => {
  const { colors } = useTheme();
  return (
    <View style={{ width: "100%", height: "100%" }}>
      <NavigationContainer independent>
        <Stack.Navigator
          initialRouteName="RoundSelect"
          screenOptions={{
            cardStyle: { backgroundColor: colors.background },
            headerStyle: {
              height: 40,
              backgroundColor: colors.surfaceVariant,
            },
          }}
        >
          <Stack.Screen
            name="RoundSelect"
            component={ScoreRoundSelect}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EmpireScoreCategoryInput"
            component={EmpireScoreCategoryInput}
            options={{
              title: "Rounds",
            }}
          />
          <Stack.Screen
            name="EndgameScoreCategoryInput"
            component={EndgameScoreCategoryInput}
            options={{
              title: "Rounds",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default ScoreRoundSelector;
