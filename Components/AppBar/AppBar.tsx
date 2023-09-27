import React from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";

const AppBar = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
        borderBottomWidth: 1,
        borderBottomColor: colors.onSurfaceDisabled,
      }}
    />
  );
};

export default AppBar;
