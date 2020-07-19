import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import {boxIcon} from './images';
import {styles} from './styles';

import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import {authenticationChange} from '../../redux/action';
import {jurusanID} from '../../redux/action';

class DashboardSantri extends React.Component {
  state = {
    boxIcon: boxIcon,
  };
  componentDidMount () {
    BackHandler.addEventListener (
      'hardwareBackPress',
      this.handleBackButtonClick
    );

    AsyncStorage.getItem ('data').then (value => {
      let data = {
        id: JSON.parse (value).id,
        token: JSON.parse (value).token,
        role: JSON.parse (value).role,
        jurusan_id: JSON.parse (value).jurusan_id,
      };

      // console.log(data.jurusan_id +' dashboard santri')

      this.props.authenticationChange (data);
      this.props.jurusanID (data);
    });
  }

  componentWillUnmount () {
    BackHandler.removeEventListener (
      'hardwareBackPress',
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick () {
    BackHandler.exitApp ();
    return true;
  }
  cautionExit = () => {
    Alert.alert (
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
            AsyncStorage.removeItem ('data');
            this.props.navigation.navigate ('DashboardUtama');
          },
        },
      ],
      {cancelable: false}
    );
  };
  changeScreen = key => {
    switch (key) {
      case 0:
        this.props.navigation.navigate ('DompetSaya');
        break;
      case 1:
        this.props.navigation.navigate ('Toko');
        break;
      case 2:
        this.props.navigation.navigate ('IDCard');
        break;
      case 3:
        this.props.navigation.navigate ('SOP');
        break;
      case 4:
        this.props.navigation.navigate ('Kurikulum');
        break;
      case 5:
        this.props.navigation.navigate ('MasukKelas');
        break;
      case 6:
        this.props.navigation.navigate ('MateriDasar');
        break;
      case 7:
        this.props.navigation.navigate ('TugasHarian');
        break;
      case 8:
        this.props.navigation.navigate ('MiniProject');
        break;
      case 9:
        this.props.navigation.navigate ('VideoCheck');
        break;
      case 10:
        this.props.navigation.navigate ('Portofolio');
        break;
      case 11:
        this.props.navigation.navigate ('CatatanPelanggaran');
        break;
      case 12:
        this.props.navigation.navigate ('Raport');
        break;
      case 13:
        this.props.navigation.navigate ('ImpianSaya');
        break;
      case 14:
        this.cautionExit ();
        break;
      default:
        alert ('lainnya');
    }
  };

  render () {
    const {boxIcon} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.dashboardTemplate}>
          <Image
            source={require ('../../assets/images/banner.png')}
            style={styles.banner}
          />
          <ScrollView>
            <View style={styles.iconTemplates}>
              <View style={styles.dashboardTitleBox}>
                <Text style={styles.dashboardTitle}>DASHBOARD SANTRI</Text>
              </View>
              {boxIcon.map ((value, key) => {
                return (
                  <View key={key} style={styles.iconField}>
                    <TouchableOpacity
                      onPress={() => this.changeScreen (key)}
                      delayPressIn={10}
                      activeOpacity={0.5}
                    >
                      <View
                        style={{
                          ...styles.boxIcon,
                          borderColor: `${value.color}`,
                        }}
                      >
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

export default connect (mapStateToProps, {authenticationChange, jurusanID}) (
  DashboardSantri
);
