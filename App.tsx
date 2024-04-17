import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, AppState, View} from 'react-native';
import {
  isStepCountingSupported,
  startBackgroundService,
  stopBackgroundService,
  startStepCounterUpdate,
  parseStepData,
} from './src/lib/StepCounter';

import {PermissionsAndroid} from 'react-native';
export default function App() {
  const [stepCount, setStepCount] = useState(0);
  const [stepCounterStatus, setStepCounterStatus] = useState({
    supported: false,
    granted: false,
  });

  AppState.addEventListener('change', handleAppStateChange);

  function handleAppStateChange(nextAppState: string) {
    if (nextAppState === 'background') {
      startBackgroundService();
    } else if (nextAppState === 'active') {
      stopBackgroundService();
    }
  }

  const checkStepCounterSupport = () => {
    console.log('Checking step counter support');
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
    );

    isStepCountingSupported().then(response => {
      const {granted, supported} = response;
      setStepCounterStatus({granted, supported});
    });
  };

  const startStepCounter = () => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    startStepCounterUpdate(today, response => {
      console.log('Step count data', response);
      const data = parseStepData(response);
      setStepCount(data.steps);
    });
  };
  useEffect(() => {
    checkStepCounterSupport();
    startStepCounter();
  }, []);
  return (
    <View style={styles.container}>
      <Text>
        Step Counter Destekleniyor mu?
        {stepCounterStatus.supported ? 'Evet' : 'Hayır'}
      </Text>
      <Text>
        Step Counter İzni verildi mi?
        {stepCounterStatus.granted ? 'Evet' : 'Hayır'}
      </Text>
      <Text style={{fontSize: 24, color: 'black'}}>Step count</Text>
      <Text style={{fontSize: 24, color: 'black'}}>{stepCount}</Text>
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
