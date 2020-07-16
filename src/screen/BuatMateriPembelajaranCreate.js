import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Navbar from '../components/Navbar';
import {Picker} from '@react-native-community/picker';

class BuatMateriPembelajaranCreate extends React.Component {
  state = {
    sprint: '',
    judul: '',
    link: '',
    picker: '',
    materi: '',
  };
  render() {
    return (
      <View style={styles.container}>
        <Navbar name="Buat Materi Pembelajaran" />
        <ScrollView style={styles.scrollview}>
          <View
            style={{
              height: 60,
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Sprint ke"
              value={this.state.sprint}
              onChangeText={(text) => this.setState({sprint: text})}
              style={{
                height: 40,
                width: '80%',
                borderWidth: 1,
                borderRadius: 2,
                borderColor: 'rgb(0,184,150)',
                padding: 5,
              }}
              multiline={true}
            />
          </View>
          <View
            style={{
              height: 60,
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 40,
                width: '80%',
                borderWidth: 1,
                borderRadius: 2,
                borderColor: 'rgb(0,184,150)',
                padding: 5,
                justifyContent: 'center',
              }}>
              <Picker
                selectedValue={this.state.picker}
                style={styles.picker}
                mode="dropdown"
                prompt="Options"
                onValueChange={(itemValue, itemIndex) => {
                  if (itemValue != '0') {
                    this.setState({picker: itemValue});
                  }
                }}>
                <Picker.Item label="Pilih Divisi" value="0" />
                <Picker.Item label="Backend" value="backend" />
                <Picker.Item label="Frontend" value="frontend" />
                <Picker.Item label="Mobile(Java)" value="mobile-java" />
                <Picker.Item
                  label="Mobile(React Native)"
                  value="mobile-react-native"
                />
              </Picker>
            </View>
          </View>
          <View
            style={{
              height: 60,
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Judul Materi Pembelajaran"
              value={this.state.judul}
              onChangeText={(text) => this.setState({judul: text})}
              style={{
                height: 40,
                width: '80%',
                borderWidth: 1,
                borderRadius: 2,
                borderColor: 'rgb(0,184,150)',
                padding: 5,
              }}
              multiline={true}
            />
          </View>
          <View
            style={{
              height: 60,
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Link Video"
              value={this.state.link}
              onChangeText={(text) => this.setState({link: text})}
              style={{
                height: 40,
                width: '80%',
                borderWidth: 1,
                borderRadius: 2,
                borderColor: 'rgb(0,184,150)',
                padding: 5,
              }}
              multiline={true}
            />
          </View>
          <View
            style={{
              height: 520,
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Materi"
              value={this.state.materi}
              textAlignVertical="top"
              onChangeText={(text) => this.setState({materi: text})}
              style={{
                height: 500,
                width: '80%',
                borderWidth: 1,
                borderRadius: 2,
                borderColor: 'rgb(0,184,150)',
                padding: 5,
              }}
              multiline={true}
            />
          </View>
          <View style={styles.centeredModalButton}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              delayPressIn={10}>
              <Text style={styles.textButton}>Buat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{...styles.button, backgroundColor: 'red'}}
              activeOpacity={0.5}
              delayPressIn={10}>
              <Text style={styles.textButton}>Batal</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default BuatMateriPembelajaranCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'white',
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
    color: 'white',
    fontWeight: 'bold',
  },
  centeredModalButton: {
    height: 100,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    height: 40,
    width: '100%',
    color: 'grey',
  },
});
