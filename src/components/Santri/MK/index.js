import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';
import Loader from './loader';
import AsyncStorage from '@react-native-community/async-storage';

class MasukKelas extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isModalVisible: false,
      isLoading: false,
      token: '',
      class_id: null,
      data: [],
      refreshing: false,
      status: true,
      animationLoad: false,
    };
  }

  toggleModal = () => {
    this.setState ({isModalVisible: !this.state.isModalVisible});
  };

  componentDidMount () {
    const Token = this.props.authentication;
    const token = Token.token;
    this.setState ({
      token: token,
    });

    setTimeout (() => {
      this.getClass ();
    }, 10);
  }

  onBarCodeRead = (...someArgs) => {
    if (!this.isBarcodeRead) {
      this.isBarcodeRead = true;
      const Data = someArgs[0].data;
      const {token} = this.state;
      const str = Data.split ('=');
      const class_id = str[1];
      this.setState ({
        class_id: class_id,
      });
      var myHeaders = new Headers ();
      myHeaders.append ('Authorization', `Bearer ${token}`);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch (`${Data}`, requestOptions)
        .then (response => response.text ())
        // .then (result => console.log (result))
        .catch (error => console.log ('error', error));
    }
    this.getClass ();
    this.toggleModal ();
  };

  onRefreshScreen = () => {
    this.getClass();
  };

  getClass = () => {
    const {token} = this.state;
    this.setState ({refreshing: true, animationLoad: true,});
    var myHeaders = new Headers ();
    myHeaders.append ('Authorization', `Bearer ${token}`);
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch (`https://api.pondokprogrammer.com/api/class`, requestOptions)
      .then (response => response.json ())
      .then (response => {
        console.log (response);
        this.setState ({
          data: response,
          refreshing: false,
          status: true,
          animationLoad: false,
          // isLoading:false
        });
      })
      .catch (error => {
        console.log (error);
        ToastAndroid.show (
          'Data gagal didapatkan',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  };

  previewKelas = value => {
    this.props.navigation.navigate ('DetailMasukKelas', {
      id: value.id,
    });
  };

  renderListScreen = () => {
  
    const data = this.state.data;
    const lengthData = data.length;
    if (lengthData === 0) {
      return (
        <View style={styles.nodata}>
          <Text style={styles.Tnodata}>Tidak Ada Data</Text>
        </View>
      );
    } else if (this.state.status) {
      return this.state.data.map ((value, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            delayPressIn={10}
            key={key}
            onPress={() => this.previewKelas (value)}
          >
            <View style={styles.ListBox}>
              <View style={styles.imageKurikulum}>
                <Text style={styles.titleImage}>{value.materi}</Text>
              </View>
              <View style={styles.boxFrameworkTitle}>
                <Text style={styles.frameworkTitle}>{value.framework}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
        
      });
    } else {
      return (
        <View style={styles.backgroundOffline}>
          <View style={styles.boxSpinner}>
            <Spinner
              type="Bounce"
              color="rgb(0,184,150)"
              isVisible={this.state.animationLoad}
            />
          </View>
          {/* <Image
         source={require('../assets/images/noconnectionlogo.png')}
         style={styles.imageOffline}
         /> */}
          <Text>Tidak Ada Koneksi Internet</Text>
          <TouchableOpacity
            style={styles.iconRefresh}
            activeOpacity={0.5}
            delayPressIn={10}
            onPress={() => this.getData ()}
          >
            <Icon name="refresh" color="rgb(0,184,150)" size={40} />
          </TouchableOpacity>
        </View>
      );
    }
   
  };

  render () {
    const {isModalVisible} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.THeader}> Masuk Kelas </Text>
        </View>
        <View style={styles.mainPMD}>
          <Loader loading={this.state.isLoading} />
          <ScrollView
            style={styles.scrollView}
            refreshControl={
              <RefreshControl
                colors={['rgb(0,184,150)']}
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefreshScreen ()}
              />
            }
          >
            {this.renderListScreen ()}
          </ScrollView>
          <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
            <View style={{flex: 1, height: '100%'}}>
              <Loader loading={this.state.isLoading} />
              <RNCamera
                ref={ref => {
                  this.camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                  title: 'Permission to use audio recording',
                  message: 'We need your permission to use your audio',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                onBarCodeRead={isModalVisible ? this.onBarCodeRead : null}
              />
              <TouchableOpacity
                style={styles.TouchableOpacityStyle}
                onPress={() => this.toggleModal ()}
              >
                <Icon
                  name="chevron-circle-left"
                  size={40}
                  color="rgb(0, 184, 150)"
                />
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity
            style={styles.TouchableOpacityStyle}
            onPress={() => this.toggleModal ()}
          >
            <Icon name="qrcode" size={40} color="rgb(0, 184, 150)" />
            <Text>Scan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication, jurusan_id} = state.reducers;
  return {authentication, jurusan_id};
};

export default connect (mapStateToProps) (MasukKelas);
