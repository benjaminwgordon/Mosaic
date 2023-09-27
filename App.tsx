import { NavigationContainer } from "@react-navigation/native";
import ScoreOverview from "./Screens/ScoreOverview";
import { GameProvider } from "./contexts/GameContext";
import { SafeAreaView } from "react-native";
import PlayerMenu from "./Screens/PlayerMenuScreen";
import Rounds from "./Screens/RoundsScreen";
import { PaperProvider } from "react-native-paper";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { navTheme, theme } from "./Styles/Theme";
import BottomBar from "./Components/BottomBar/BottomBar";
import AppBar from "./Components/AppBar/AppBar";
import { StatusBar } from "expo-status-bar";

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <GameProvider>
      <PaperProvider theme={theme}>
        <StatusBar style="light" />
        <AppBar />
        <SafeAreaView style={{ flex: 1 }}>
          <NavigationContainer theme={navTheme.DarkTheme}>
            <Tab.Navigator
              backBehavior="history"
              activeColor={theme.colors.primary}
              inactiveColor={theme.colors.onBackground}
              barStyle={{
                height: 65,
                backgroundColor: theme.colors.background,
                borderTopWidth: 1,
                borderTopColor: theme.colors.onSurfaceDisabled,
              }}
              initialRouteName="players"
            >
              <Tab.Screen
                name="rounds"
                component={Rounds}
                options={{
                  title: "Rounds",
                  tabBarIcon: "format-list-numbered",
                }}
              />
              <Tab.Screen
                name="scores"
                component={ScoreOverview}
                options={{ title: "Scores", tabBarIcon: "trophy" }}
              />
              <Tab.Screen
                name="players"
                component={PlayerMenu}
                options={{
                  title: "Players",
                  tabBarIcon: "account-group",
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaView>
        <BottomBar />
      </PaperProvider>
    </GameProvider>
  );
}
