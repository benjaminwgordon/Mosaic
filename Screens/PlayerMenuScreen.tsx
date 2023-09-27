import React, { useEffect, useRef } from "react";
import PlayerView from "../Components/PlayerView/PlayerView";
import { Animated, Dimensions } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type RootTabParamList = {
  rounds: undefined;
  scores: undefined;
  players: undefined;
};

type PlayerMenuScreenProps = BottomTabScreenProps<RootTabParamList, "players">;

const PlayerMenuScreen = (props: PlayerMenuScreenProps) => {
  const slideIn = useRef(new Animated.Value(0)).current;
  const { navigation } = props;

  const slideInSpring = () => {
    Animated.spring(slideIn, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", () => {
      slideIn.resetAnimation();
      slideInSpring();
    });
    return unsub;
  }, [navigation]);

  return (
    <Animated.View
      style={{
        height: "100%",
        transform: [
          {
            translateX: slideIn.interpolate({
              inputRange: [0, 1],
              outputRange: [-Dimensions.get("window").width, 0],
            }),
          },
        ],
      }}
    >
      <PlayerView />
    </Animated.View>
  );
};

export default PlayerMenuScreen;
