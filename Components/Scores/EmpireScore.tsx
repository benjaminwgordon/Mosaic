import { View, Text } from "react-native";
import { EmpireRoundScoring, EmpireScoring } from "../../types/EmpireScore";

type EmpireScoreProps = {
  empireScore: EmpireRoundScoring;
};

const EmpireScore = (props: EmpireScoreProps) => {
  const {
    hispania,
    gaul,
    italia,
    greece,
    assyria,
    egpyt,
    numidia,
    government,
  } = props.empireScore;
  return (
    <View>
      <Text style={empireScoreTableCellStyle}>{hispania}</Text>
      <Text style={empireScoreTableCellStyle}>{gaul}</Text>
      <Text style={empireScoreTableCellStyle}>{italia}</Text>
      <Text style={empireScoreTableCellStyle}>{greece}</Text>
      <Text style={empireScoreTableCellStyle}>{assyria}</Text>
      <Text style={empireScoreTableCellStyle}>{egpyt}</Text>
      <Text style={empireScoreTableCellStyle}>{numidia}</Text>
      <Text style={empireScoreTableCellStyle}>{government}</Text>
    </View>
  );
};

const empireScoreTableCellStyle = {
  fontSize: 16,
};

export default EmpireScore;
