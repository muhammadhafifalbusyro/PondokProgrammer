import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
  ToastAndroid,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import {boxIcon} from './images';
import {styles} from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {authenticationChange} from '../../redux/action';
import Spinner from 'react-native-spinkit';
import {jurusanID} from '../../redux/action';

class DashboardSantri extends React.Component {
  state = {
    modalVisible: false,
    boxIcon: boxIcon,
  };
  componentDidMount() {
    // BackHandler.addEventListener(
    //   'hardwareBackPress',
    //   this.handleBackButtonClick,
    // );

    AsyncStorage.getItem('data').then(value => {
      let data = {
        id: JSON.parse(value).id,
        token: JSON.parse(value).token,
        role: JSON.parse(value).role,
        jurusan_id: JSON.parse(value).jurusan_id,
      };

      // console.log(data.jurusan_id +' dashboard santri')

      this.props.authenticationChange(data);
      this.props.jurusanID(data);
    });
  }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener(
  //     'hardwareBackPress',
  //     this.handleBackButtonClick,
  //   );
  // }

  // handleBackButtonClick() {
  //   BackHandler.exitApp();
  //   return true;
  // }
  logout = () => {
    let data = this.props.authentication;
    let token = data.token;
    let id = data.id;

    this.setState({modalVisible: true});
    fetch('https://api.pondokprogrammer.com/api/student_logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 'success') {
          console.log(json.status);
          this.setState({modalVisible: false});
          AsyncStorage.removeItem('data');
          this.props.navigation.replace('Main');
          ToastAndroid.show(
            'Anda berhasil logout akun',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({modalVisible: false});
        ToastAndroid.show(
          'Network error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };
  cautionExit = () => {
    Alert.alert(
      'Keluar Akun',
      'Apa anda yakin ingin keluar ?',
      [
        {
          text: 'Tidak',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.logout();
          },
        },
      ],
      {cancelable: false},
    );
  };
  changeScreen = key => {
    switch (key) {
      case 0:
        this.props.navigation.navigate('DompetSaya');
        break;
      case 1:
        this.props.navigation.navigate('Toko');
        break;
      case 2:
        this.props.navigation.navigate('IDCard');
        break;
      case 3:
        this.props.navigation.navigate('SOP');
        break;
      case 4:
        this.props.navigation.navigate('Kurikulum');
        break;
      case 5:
        this.props.navigation.navigate('MasukKelas');
        break;
      case 6:
        this.props.navigation.navigate('MateriDasar');
        break;
      case 7:
        this.props.navigation.navigate('TugasHarian');
        break;
      case 8:
        this.props.navigation.navigate('MiniProject');
        break;
      case 9:
        this.props.navigation.navigate('VideoCheck');
        break;
      case 10:
        this.props.navigation.navigate('Portofolio');
        break;
      case 11:
        this.props.navigation.navigate('CatatanPelanggaran');
        break;
      case 12:
        this.props.navigation.navigate('Raport');
        break;
      case 13:
        this.props.navigation.navigate('ImpianSaya');
        break;
      case 14:
        this.cautionExit();
        break;
      default:
        alert('lainnya');
    }
  };

  render() {
    const {boxIcon} = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            ToastAndroid.show(
              'Tunggu proses sampai selesai',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalContainer}>
              <Spinner visible={true} type="Wave" color="rgb(0,184,150)" />
              <Text style={styles.textModal}>Loading</Text>
            </View>
          </View>
        </Modal>
        <View style={styles.dashboardTemplate}>
          <Image
            source={require('../../assets/images/banner.png')}
            style={styles.banner}
          />
          <ScrollView>
            <View style={styles.iconTemplates}>
              <View style={styles.dashboardTitleBox}>
                <Text style={styles.dashboardTitle}>DASHBOARD SANTRI</Text>
              </View>
              {boxIcon.map((value, key) => {
                return (
                  <View key={key} style={styles.iconField}>
                    <TouchableOpacity
                      style={{
                        ...styles.boxIcon,
                        borderColor: `${value.color}`,
                      }}
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
          </ScrollView>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {authentication, jurusan_id} = state.reducers;
  return {authentication, jurusan_id};
};

export default connect(
  mapStateToProps,
  {
    authenticationChange,
    jurusanID,
  },
)(DashboardSantri);
