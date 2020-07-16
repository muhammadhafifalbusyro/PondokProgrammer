import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity, Button, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import Modal from 'react-native-modal';

class ImpianSaya extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isModalVisible: false,
    };
  }

  toggleModal = () => {
    this.setState ({isModalVisible: !this.state.isModalVisible});
  };

  componentDidUpdate () {
    console.log('unmount')
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View style={styles.header}>
          <Text style={styles.pmd}>Impian Saya</Text>
        </View>
        <View style={styles.mainPMD}>
          <TouchableOpacity
            onPress={() => alert()}
            style={styles.subPMD}
          >
            <View style={styles.flexbox}>
              <View style={styles.widthBox}>
                <Text style={styles.Tlist}>
              Buat OS
                </Text>
              </View>
              <View style={styles.iconBox}>
                <Icon name="arrow-right" size={20} color="rgb(0, 184, 150)" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
          <Modal isVisible={this.state.isModalVisible} style={styles.modal}>
            <View style={styles.contentModal}>
              <TextInput
                placeholder="Impian Saya"
                style={styles.TInput}
              />
              <TouchableOpacity style={styles.submit} onPress={() => alert()}>
                <Text style={styles.Tsubmit}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submit} onPress={() => this.toggleModal ()} >
                <Text style={styles.Tsubmit}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        <TouchableOpacity style={styles.Add} onPress={() => this.toggleModal ()}>
          <Icon name="plus-circle" size={60} color="rgb(0, 184, 150)" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.TouchableOpacityStyle}
          onPress={() => this.props.navigation.goBack ()}
        >
          <Icon name="arrow-left" size={60} color="rgb(0, 184, 150)" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default ImpianSaya;
