import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ToastAndroid,
  TouchableHighlight,
  Button,
} from 'react-native';
import Toast from 'react-native-toast-message';

const App = () => {
  const toastWithDurationHandler = () => {
    ToastAndroid.show('Hi This is a sample toast message', ToastAndroid.SHORT);
  };
  const toastWithDurationGravityHandler = () => {
    ToastAndroid.show(
      'Hi I am toast with center gravity',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };

  const toastWithDurationGravityOffsetHandler = () => {
    ToastAndroid.show(
      'Hi I am toast with gravity and offset',
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      500,
    );
  };

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.titleStyle}>
          React Native toast alert for android
        </Text>

        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={toastWithDurationHandler}>
          <Text style={styles.buttonTextStyle}>
            Generate Toast with duration
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={toastWithDurationGravityHandler}>
          <Text style={styles.buttonTextStyle}>
            Generate Toast with duration and gravity
          </Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.buttonStyle}
          onPress={toastWithDurationGravityOffsetHandler}>
          <Text style={styles.buttonTextStyle}>
            Generate Toast with duration, gravity and offset
          </Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonStyle} onPress={showToast}>
          <Text style={styles.buttonTextStyle}>Show Toast</Text>
        </TouchableHighlight>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
