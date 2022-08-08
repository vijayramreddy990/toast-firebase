import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  TouchableHighlight,
  Button,
  Alert,
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import ToastComponent from './Components/Toast';

const App = () => {
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    console.log('Authorization status(authStatus):', authStatus);
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(fcmToken => {
          console.log('fcmToken:::', fcmToken);
        });
    } else {
      console.log('Not authorization status:');
    }

    messaging()
      .getInitialNotification()
      .then(async remoteMessage => {
        if (remoteMessage) {
          console.log(
            'getInitialNotification',
            +'Notification caused app to open app from quit state',
          );
        }
        console.log(':::1', remoteMessage);
        Alert.alert(
          'getInitialNotification',
          +'Notification caused app to open app from quit state',
        );
      });

    messaging().onNotificationOpenedApp(async remoteMessage => {
      if (remoteMessage) {
        console.log(
          'onNotificationOpenedApp:' +
            'Notification caused app to open from background state',
        );
      }
      console.log(':::2', remoteMessage);
      Alert.alert(
        'onNotificationOpenedApp:' +
          'Notification caused app to open from background state',
      );
    });

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background', remoteMessage);
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new fcm message arrived!');
      console.log('A new fcm message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ToastComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    textAlign: 'center',
    backgroundColor: '#307ecc',
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'white',
  },
  textStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
});

export default App;
