import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import ScoreOverview from "./Screens/ScoreOverview";
import { GameProvider } from "./contexts/GameContext";
import { SafeAreaView } from "react-native";
import PlayerMenu from "./Screens/PlayerMenu";

import {
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";

const Tab = createMaterialBottomTabNavigator();
const { LightTheme } = adaptNavigationTheme({
  reactNavigationLight: DefaultTheme,
});

export default function App() {
  return (
    <GameProvider>
      <PaperProvider theme={MD3LightTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer theme={LightTheme}>
            <Tab.Navigator>
              <Tab.Screen
                name="playerMenu"
                component={PlayerMenu}
                options={{ title: "Configure Players" }}
              />
              <Tab.Screen
                name="scores"
                component={ScoreOverview}
                options={{ title: "Scores" }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </GameProvider>
  );
}
