import React from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "react-native-paper";

const BottomBar = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background,
      }}
    />
  );
};

export default BottomBar;
