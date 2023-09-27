// merge the react-native and react-native-paper themes
import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { MD3DarkTheme, adaptNavigationTheme } from "react-native-paper";
import { COLORS } from "./Colors";

export const theme = {
  ...MD3DarkTheme,
  colors: {
    ...COLORS,
  },
};

export const navTheme = adaptNavigationTheme({
  reactNavigationDark: NavigationDarkTheme,
});
