import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import Modal from 'react-native-modal';


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

  onSuccess = e => {
    console.log(e)
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };


  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.THeader}> Masuk Kelas </Text>
        </View>
        <View style={styles.mainPMD}>
          <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
            <View style={styles.container}>
              <TouchableOpacity
                style={styles.TouchableOpacityStyle}
                onPress={() => this.toggleModal ()}
              >
                <Icon name="chevron-circle-left" size={40} color="rgb(0, 184, 150)" />
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
