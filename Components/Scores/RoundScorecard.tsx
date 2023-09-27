import React from "react";
import { Card, useTheme } from "react-native-paper";
import EmpireScoreTable from "./EmpireScore";
import { Player } from "../../types/Players";
import { EmpireRoundScoring } from "../../types/EmpireScore";

type RoundScoreCardProps = {
  round: {
    player: Player;
    roundScores: EmpireRoundScoring;
  }[];
  roundName: string;
  roundNumber: 0 | 1 | 2;
};

const RoundScorecard = (props: RoundScoreCardProps) => {
  const { colors } = useTheme();
  const { round, roundName, roundNumber } = props;
  return (
    <Card style={{ margin: 5, backgroundColor: colors.surface }}>
      <Card.Title
        style={{
          backgroundColor: colors.surfaceVariant,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
        titleStyle={{ color: colors.onSurfaceVariant, textAlign: "center" }}
        titleVariant="headlineMedium"
        title={roundName}
      />
      <Card.Content
        style={{ paddingHorizontal: 0, paddingVertical: 0, paddingBottom: 0 }}
      >
        <EmpireScoreTable roundNumber={0} round={round} />
      </Card.Content>
    </Card>
  );
};

export default RoundScorecard;
