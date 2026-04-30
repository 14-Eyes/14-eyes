import { View, Text } from 'react-native';

const ScoreBoard = ({ score }) => {
  return (
    <View className="score-board">
      <Text>{score}</Text>
    </View>
  )
}

export default ScoreBoard