import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Spinner from 'react-native-spinkit';
import AsyncStorage from '@react-native-community/async-storage';

class SplashScreen extends React.Component {
  componentDidMount = () => {
    // Remember the timer handle

    this.timerHandle = setTimeout(() => {
      AsyncStorage.getItem('data').then(value => {
        console.log(value);
        if (value != null) {
          if (JSON.parse(value).role == '1') {
            this.props.navigation.replace('MainMentor');
          } else if (JSON.parse(value).role == '2') {
            this.props.navigation.replace('MainSantri');
          }
        } else {
          this.props.navigation.replace('Main');
        }
      });
      this.timerHandle = 0;
    }, 4000);
  };
  componentWillUnmount = () => {
    // Is our timer running?
    if (this.timerHandle) {
      // Yes, clear it
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  };
  render() {
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
  }
}
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
