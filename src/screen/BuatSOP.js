import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import AddButton from '../components/AddButton';
import Icon from 'react-native-vector-icons/FontAwesome';

class BuatSOP extends React.Component {
  state = {
    modalVisible: false,
    valueSOP: '',
    data: [
      {
        id: 1,
        value: 'jangan merokok',
      },
      {
        id: 2,
        value: 'jangan merokok',
      },
      {
        id: 3,
        value: 'jangan merokok',
      },
      {
        id: 4,
        value:
          'jangan merokoksjdflksdlkfasldfalsdflasdlfasldfalsdflasjdlfasdlfjalsdflasdlfasdlfalsdflasdflasdl',
      },
    ],
  };
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalContainer}>
              <TextInput
                multiline={true}
                placeholder="Tuliskan SOP"
                value={this.state.text}
                onChangeText={(text) => this.setState({valueSOP: text})}
                style={styles.textInput}
              />
              <View style={styles.centeredModalButton}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.5}
                  delayPressIn={10}>
                  <Text style={styles.textButton}>Buat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible: false})}
                  style={{...styles.button, backgroundColor: 'red'}}
                  activeOpacity={0.5}
                  delayPressIn={10}>
                  <Text style={styles.textButton}>Batal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Navbar name="Buat SOP" />
        <ScrollView style={styles.scrollview}>
          {this.state.data.map((value, key) => {
            return (
              <View key={key} style={styles.containerList}>
                <View style={styles.fieldText}>
                  <View style={styles.contentNumber}>
                    <Text style={styles.textContentNumber}>{key + 1}</Text>
                  </View>
                  <View style={styles.textContentValue}>
                    <Text>{value.value}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  delayPressIn={10}
                  style={styles.trash}>
                  <Icon name="trash" size={20} color="white" />
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
        <AddButton params={() => this.setState({modalVisible: true})} />
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

export default BuatSOP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: '30%',
    width: '90%',
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 30,
    width: '40%',
    fontSize: 16,
    borderRadius: 3,
    padding: 10,
    backgroundColor: 'rgb(0,184,150)',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    height: 60,
    width: '80%',
    borderColor: 'rgb(0, 184, 150)',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  scrollview: {
    flex: 1,
  },
  centeredModalButton: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  containerList: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 3,
  },
  fieldText: {
    height: 70,
    width: '85%',
    flexDirection: 'row',
  },
  contentNumber: {
    height: 70,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    backgroundColor: 'rgb(0,184,150)',
  },
  textContentNumber: {
    color: 'white',
  },
  textContentValue: {
    height: 70,
    width: '90%',
    justifyContent: 'center',
    padding: 5,
  },
  trash: {
    height: 70,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
  },
});
