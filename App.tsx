import { PlayerProvider } from "./contexts/PlayerContext";
import { NavigationContainer } from "@react-navigation/native";
import PlayerMenu from "./Screens/PlayerMenu";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ScoreOverview from "./Screens/ScoreOverview";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PlayerProvider>
      <NavigationContainer>
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
    </PlayerProvider>
  );
}
