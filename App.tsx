import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function App() {
  const [stepCount, setStepCount] = React.useState(0);
  return (
    <View style={styles.container}>
      <Text>Step count</Text>
      <Text>{stepCount}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
