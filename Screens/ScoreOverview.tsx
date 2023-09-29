import React, { useEffect, useRef } from "react";
import { Game, useGame } from "../contexts/GameContext";
import { Button, Card, useTheme } from "react-native-paper";
import { Animated, Dimensions, ScrollView, Text, View } from "react-native";
import EmpireScoreTable from "../Components/Scores/EmpireScore";
import RoundScorecard from "../Components/Scores/RoundScorecard";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

type RootTabParamList = {
  rounds: undefined;
  scores: undefined;
  players: undefined;
};

type ScoreOverviewScreenProps = BottomTabScreenProps<
  RootTabParamList,
  "scores"
>;

const ScoreOverview = (props: ScoreOverviewScreenProps) => {
  const game = useGame();
  const { navigation } = props;
  const { colors } = useTheme();
  const roundOrientedGameState = getRoundBasedGameState(game);

  const slideIn = useRef(new Animated.Value(0)).current;
  const slideInSpring = () => {
    Animated.spring(slideIn, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const unsub = navigation.addListener("focus", () => {
      // Slide in the View from either left or right, depending on prevNavState prop
      slideInSpring();
    });
    return unsub;
  }, [navigation]);

  const toPlayersScreenButton = () => {
    return (
      <Button
        mode="contained"
        icon={"account-plus-outline"}
        onPress={() => {
          navigation.navigate("players");
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
        // transform: [
        //   {
        //     translateX: slideIn.interpolate({
        //       inputRange: [-1, 1],
        //       outputRange: [
        //         -Dimensions.get("window").width,
        //         Dimensions.get("window").width,
        //       ],
        //     }),
        //   },
        // ],
      }}
    >
      {game.entities.players.allIds.length > 0 ? (
        <ScrollView
          style={{ backgroundColor: colors.background, width: "100%" }}
        >
          <RoundScorecard
            round={roundOrientedGameState.round1}
            roundName={"Empire Round 1"}
            roundNumber={0}
          />
          <RoundScorecard
            round={roundOrientedGameState.round2}
            roundName={"Empire Round 2"}
            roundNumber={1}
          />
          <RoundScorecard
            round={roundOrientedGameState.round3}
            roundName={"Empire Round 3"}
            roundNumber={2}
          />
        </ScrollView>
      ) : (
        <View>
          <Text>Add players to view and edit scores</Text>
          {toPlayersScreenButton()}
        </View>
      )}
    </Animated.View>
  );
};

export default ScoreOverview;

const getRoundBasedGameState = (game: Game) => {
  const playerIds = game.entities.players.allIds;
  const denormalizedGameState = playerIds.map((playerId) => {
    // fetch player
    const player = Object.values(game.entities.players.byId).find(
      (player) => player.id == playerId
    );
    // fetch player's empire scores
    const empireScoreId = Object.values(
      game.entities.playerEmpireScores.byId
    ).find(
      (playerEmpireScore) => playerEmpireScore.playerId == playerId
    ).empireScoreID;
    const empireScore = game.entities.empireScores.byId[empireScoreId];
    const [round1EmpireScore, round2EmpireScore, round3EmpireScore] =
      empireScore;

    // fetch player's endgame scores
    const endgameScoreId = Object.values(
      game.entities.playerEndgameScores.byId
    ).find(
      (playerEndgameScore) => playerEndgameScore.playerId == playerId
    ).endgameScoreId;
    const endgameScore = game.entities.endgameScores.byId[endgameScoreId];

    return {
      player: player,
      round1Scores: round1EmpireScore,
      round2Scores: round2EmpireScore,
      round3Scores: round3EmpireScore,
      endgameScores: endgameScore,
    };
  });

  // break the data into individual rounds

  const round1 = denormalizedGameState.map((playerScores) => {
    return {
      player: playerScores.player,
      roundScores: playerScores.round1Scores,
    };
  });

  const round2 = denormalizedGameState.map((playerScores) => {
    return {
      player: playerScores.player,
      roundScores: playerScores.round2Scores,
    };
  });

  const round3 = denormalizedGameState.map((playerScores) => {
    return {
      player: playerScores.player,
      roundScores: playerScores.round3Scores,
    };
  });

  const endgame = denormalizedGameState.map((playerScores) => {
    return {
      player: playerScores,
      endGameScores: playerScores.endgameScores,
    };
  });

  return {
    round1,
    round2,
    round3,
    endgame,
  };
};
