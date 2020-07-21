import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';
import {RNCamera} from 'react-native-camera';

class MasukKelas extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState ({isModalVisible: !this.state.isModalVisible});
  };

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.THeader}> Masuk Kelas </Text>
        </View>
        <View style={styles.mainPMD}>
          <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
            <View style={{flex : 1, height : '100%'}}>
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
                onBarCodeRead={(barcodes) => {
                  console.log (barcodes.data);
                  this.toggleModal()
                }}
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

export default MasukKelas;
