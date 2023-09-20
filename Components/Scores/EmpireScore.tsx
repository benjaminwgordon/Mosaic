import { EmpireRoundScoring, EmpireScoring } from "../../types/EmpireScore";
import { DataTable } from "react-native-paper";
import { EmpireScoreCategory } from "../../reducers/EmpireScoreReducer";
import { Player } from "../../types/Players";
import ScoreCell from "./ScoreCell";

type EmpireScoreTableProps = {
  roundNumber: 0 | 1 | 2;
  round: {
    player: Player;
    roundScores: EmpireRoundScoring;
  }[];
};

const EmpireScoreTable = (props: EmpireScoreTableProps) => {
  const { round, roundNumber } = props;

  const empireScoringCategories: EmpireScoreCategory[] = [
    "hispania",
    "gaul",
    "italia",
    "greece",
    "assyria",
    "egpyt",
    "numidia",
    "government",
  ];

  const tableHeader = () => {
    return (
      <DataTable.Header style={{ margin: 0, padding: 0 }}>
        {/* padding */}
        <DataTable.Title
          key={0}
          style={{
            justifyContent: "center",
            minWidth: 20,
          }}
        >
          {""}
        </DataTable.Title>
        {empireScoringCategories.map((category, index) => (
          <DataTable.Title
            key={index + 1}
            style={{
              justifyContent: "center",
            }}
          >
            {category.substring(0, 4)}
          </DataTable.Title>
        ))}
      </DataTable.Header>
    );
  };

  return (
    <DataTable>
      {tableHeader()}
      {round.map((playerEmpireRound, index) => {
        return (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{ minWidth: 20 }}>
              {playerEmpireRound.player.name}
            </DataTable.Cell>
            {Object.values(playerEmpireRound.roundScores).map(
              (categoryScore, index) => (
                <DataTable.Cell
                  key={index}
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <ScoreCell
                    categoryScore={categoryScore}
                    roundNumber={roundNumber}
                    playerId={playerEmpireRound.player.id}
                    empireScoringCategories={empireScoringCategories}
                    cellIndex={index}
                  />
                </DataTable.Cell>
              )
            )}
          </DataTable.Row>
        );
      })}
    </DataTable>
  );
};

export default EmpireScoreTable;
