import { Button, Text, useTheme } from "react-native-paper";
import { Animated, Dimensions, View } from "react-native";
import { Game, useGame } from "../contexts/GameContext";
import { EmpireRoundScoring } from "../types/EmpireScore";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useEffect, useRef } from "react";
import { RootTabParamList } from "../App";
import ScoreRoundSelector from "../Components/ScoreRoundSelector/ScoreRoundSelector";

type RoundsScreenProps = BottomTabScreenProps<RootTabParamList, "rounds">;

const RoundsScreen = (props: RoundsScreenProps) => {
  const { navigation } = props;
  const game = useGame();
  const currentRound: number = getCurrentRound(game);
  const hasPlayers = Object.values(game.entities.players.byId).length > 0;
  const { colors } = useTheme();

  const slideInTimer = useRef(new Animated.Value(0)).current;

  const timedShowTooltip = () => {
    Animated.spring(slideInTimer, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", () => {
      console.log(navigation.getState().history);
      slideInTimer.resetAnimation();
      timedShowTooltip();
    });
    return unsub;
  }, [navigation]);

  const toPlayersScreenButton = () => {
    return (
      <Button
        mode="contained"
        icon={"account-plus-outline"}
        onPress={() => {
          navigation.navigate("players", { prevRelNavIndex: -1 });
        }}
      >
        {}
      </Button>
    );
  };

  return (
    <Animated.View
      style={{
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        transform: [
          {
            translateX: slideInTimer.interpolate({
              inputRange: [0, 1],
              outputRange: [Dimensions.get("window").width, 0],
            }),
          },
        ],
      }}
    >
      {hasPlayers ? (
        <ScoreRoundSelector />
      ) : (
        <View>
          <Text>Add players to start scoring rounds</Text>
          {toPlayersScreenButton()}
        </View>
      )}
    </Animated.View>
  );
};

export default RoundsScreen;

/**
 * calculates the current round, defined as the first round
 * that has no current scores
 * @param game
 */
const getCurrentRound = (game: Game): number => {
  let lowestIncompleteRound = 0;

  // for each scoreset
  Object.values(game.entities.empireScores.byId).forEach((empireScoreSet) => {
    // evaluate which round is the lowest incomplete round
    empireScoreSet.forEach((round, index) => {
      if (isRoundComplete(round)) {
        lowestIncompleteRound = Math.min(lowestIncompleteRound, index);
      }
    });
  });
  return lowestIncompleteRound;
};

const isRoundComplete = (round: EmpireRoundScoring): Boolean => {
  return Object.values(round).some((roundCategoryScore) => {
    return roundCategoryScore != 0;
  });
};
