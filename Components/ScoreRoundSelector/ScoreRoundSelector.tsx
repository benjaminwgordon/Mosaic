import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Button, useTheme } from "react-native-paper";
import EmpireScoreCategoryInput from "../EmpireScoreCategoryInput/EmpireScoreCategoryInput";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RootTabParamList } from "../../App";
import EndgameScoreCategoryInput from "../EndgameScoreCategoryInput/EndgameScoreCategoryInput";
import { View } from "react-native";
import ScoreRoundSelect from "../ScoreRoundSelect/ScoreRoundSelect";

const Stack = createStackNavigator();

type ScoreRoundSelectorProps = BottomTabScreenProps<RootTabParamList, "rounds">;

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
          <Stack.Screen name="RoundSelect" component={ScoreRoundSelect} />
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
