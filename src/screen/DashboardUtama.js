import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import SplashScreen from '../components/SplashScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class DashboardUtama extends React.Component {
  state = {
    modalVisible: false,
    splash: true,
    loadingAnimation: false,
    boxIcon: [
      {
        iconName: 'home',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Profile  Pondok',
      },
      {
        iconName: 'slack',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Program Pondok',
      },
      {
        iconName: 'phone',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Kontak',
      },
      {
        iconName: 'sign-in',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Masuk',
      },
      {
        iconName: 'pencil-square-o',
        size: 30,
        color: 'rgb(0,184,150)',
        title: 'Daftar',
      },
    ],
  };
  changeScreen = index => {
    switch (index) {
      case 0:
        this.props.navigation.navigate('ProfilePondok');
        break;
      case 1:
        this.props.navigation.navigate('ProgramPondok');
        break;
      case 2:
        Linking.openURL('http://wa.me/qr/5JTJKHXEH2R3M1');
        break;
      case 3:
        this.props.navigation.navigate('Login');
        break;
      case 4:
        this.props.navigation.navigate('Register');
        break;
      default:
        alert('lainnya');
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.dashboardTemplate}>
          <Image
            source={require('../assets/images/banner.png')}
            style={styles.banner}
          />
          <View style={styles.iconTemplates}>
            <View style={styles.dashboardTitleBox}>
              <Text style={styles.dashboardTitle}>DASHBOARD</Text>
            </View>
            {this.state.boxIcon.map((value, key) => {
              return (
                <View key={key} style={styles.iconField}>
                  <TouchableOpacity
                    style={styles.boxIcon}
                    onPress={() => this.changeScreen(key)}
                    delayPressIn={10}
                    activeOpacity={0.5}>
                    <Icon
                      name={value.iconName}
                      size={value.size}
                      color={value.color}
                    />
                  </TouchableOpacity>
                  <Text style={styles.textIcon}>{value.title}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    );
  }
}

export default DashboardUtama;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(237, 237, 235)',
  },
  dashboardTemplate: {
    flex: 1,
  },
  iconTemplates: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 15,
  },
  iconField: {
    height: 115,
    width: windowWidth / 4,
    alignItems: 'center',
  },
  boxIcon: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(0, 184, 150)',
  },
  textIcon: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  dashboardTitleBox: {
    width: '100%',
    margin: 15,
  },
  dashboardTitle: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 14,
  },
  banner: {
    height: '30%',
    width: '100%',
  },
});
