import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';

const SplashScreen = () => {
  return (
    <View style={styles.splash}>
      <Image source={require('../assets/images/logo.png')} />
      <Spinner
        visible={true}
        type="Wave"
        color="rgb(0, 184, 150)"
        style={styles.loading}
      />
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  splash: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  loading: {
    marginTop: 10,
  },
});
