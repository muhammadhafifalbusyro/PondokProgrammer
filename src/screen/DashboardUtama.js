import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import SplashScreen from '../components/SplashScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

class DashboardUtama extends React.Component {
  state = {
    splash: true,
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
  componentDidMount = () => {
    // Remember the timer handle
    this.timerHandle = setTimeout(() => {
      this.setState({splash: false});
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

  splashScreen = () => {
    const {splash} = this.state;
    if (splash) {
      return <SplashScreen />;
    }
  };

  changeScreen = (index) => {
    switch (index) {
      case 0:
        this.props.navigation.navigate('ProfilePondok');
        break;
      case 1:
        this.props.navigation.navigate('ProgramPondok');
        break;
      case 2:
        Linking.openURL('https://wa.me/qr/5JTJKHXEH2R3M1');
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
        {this.splashScreen()}
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
                    onPress={() => this.changeScreen(key)}
                    delayPressIn={10}
                    activeOpacity={0.5}>
                    <View style={styles.boxIcon}>
                      <Icon
                        name={value.iconName}
                        size={value.size}
                        color={value.color}
                      />
                    </View>
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
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 15,
  },
  iconField: {
    height: 80,
    width: 80,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  boxIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(0, 184, 150)',
    marginBottom: 3,
  },
  textIcon: {
    textAlign: 'center',
    fontSize: 12,
  },
  dashboardTitleBox: {
    width: '100%',
  },
  dashboardTitle: {
    margin: 5,
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 14,
  },
  banner: {
    height: '30%',
    width: '100%',
  },
});
