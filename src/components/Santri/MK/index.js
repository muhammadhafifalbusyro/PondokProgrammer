import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
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

    AsyncStorage.getItem ('class_id').then (value => {
      this.setState ({class_id: JSON.parse (value)});
    });

    setTimeout (() => {
      this.getClass ();
    }, 2000);
  }

  // componentDidUpdate () {
  //   this.getClass ();
  // }

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
      AsyncStorage.setItem ('class_id', JSON.stringify (class_id));
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

  getClass = () => {
    const {class_id, token} = this.state;
    if (class_id === null) {
      console.log ('Class Id Tidak');
    } else {
      var myHeaders = new Headers ();
      myHeaders.append ('Authorization', `Bearer ${token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch (
        `https://api.pondokprogrammer.com/api/class/${class_id}`,
        requestOptions
      )
        .then (response => response.text ())
        .then (result => console.log (result))
        .catch (error => console.log ('error', error));
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
