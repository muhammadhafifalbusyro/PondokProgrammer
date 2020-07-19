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
import {Picker} from '@react-native-community/picker';

class BuatKelasCreate extends React.Component {
  state = {
    modalVisible: false,
    divisi: '',
    framework: '',
    mentor: '',
    materi: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.centeredView}>
          <View
            style={{
              height: 40,
              width: '80%',
              borderWidth: 1,
              borderRadius: 2,
              borderColor: 'rgb(0,184,150)',
              padding: 5,
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <Picker
              selectedValue={this.state.divisi}
              style={styles.picker}
              mode="dropdown"
              prompt="Options"
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue != '0') {
                  this.setState({picker: itemValue});
                }
              }}>
              <Picker.Item label="Pilih Divisi" value="0" color="grey" />
              <Picker.Item label="Backend" value="1" />
              <Picker.Item label="Frontend" value="2" />
              <Picker.Item label="Mobile" value="3" />
            </Picker>
          </View>
          <View
            style={{
              height: 40,
              width: '80%',
              borderWidth: 1,
              borderRadius: 2,
              borderColor: 'rgb(0,184,150)',
              padding: 5,
              justifyContent: 'center',
              marginBottom: 20,
            }}>
            <Picker
              selectedValue={this.state.framework}
              style={styles.picker}
              mode="dropdown"
              prompt="Options"
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue != '0') {
                  this.setState({picker: itemValue});
                }
              }}>
              <Picker.Item label="Pilih Framework" value="0" color="grey" />
              <Picker.Item label="React Native" value="1" />
              <Picker.Item label="Laravel" value="2" />
              <Picker.Item label="React Js" value="3" />
            </Picker>
          </View>
          <TextInput
            placeholder="Judul Materi"
            value={this.state.materi}
            onChangeText={text => this.setState({mentor: text})}
            style={{
              height: 40,
              width: '80%',
              borderWidth: 1,
              borderRadius: 2,
              borderColor: 'rgb(0,184,150)',
              padding: 5,
              marginBottom: 20,
            }}
            multiline={true}
          />
          <TextInput
            placeholder="Nama Mentor"
            value={this.state.mentor}
            onChangeText={text => this.setState({materi: text})}
            style={{
              height: 40,
              width: '80%',
              borderWidth: 1,
              borderRadius: 2,
              borderColor: 'rgb(0,184,150)',
              padding: 5,
              marginBottom: 20,
            }}
            multiline={true}
          />
          <View style={styles.centeredModalButton}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              delayPressIn={10}>
              <Text style={styles.textButton}>Buat</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

export default BuatKelasCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '15%',
    backgroundColor: 'white',
  },
  modalContainer: {
    height: '50%',
    width: '90%',
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: '100%',
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
