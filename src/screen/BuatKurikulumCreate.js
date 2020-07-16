import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import Navbar from '../components/Navbar';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {auth_pengjajar} from '../config/utils';
const axios = require('axios');

// More info on all the options is below in the API Reference... just some common use cases shown here
const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class BuatKurikulumCreate extends React.Component {
  state = {
    avatarSource: {
      uri: 'https://static.thenounproject.com/png/1560819-200.png',
    },
    fileName: '',
    type: '',
    uri: '',
    framework: '',
    jumlahSprint: '',
    picker: '',
    deskripsi: '',
    coba: '',
  };

  pickerImage = () => {
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const fileName = response.fileName;
        const type = response.type;
        const uri = response.uri;
        const path = response.path;

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
          fileName: fileName,
          type: type,
          uri: uri,
          path: path,
          coba: response,
        });
      }
    });
  };
  postData = (divisi, framework, sprint, desc) => {
    console.log(divisi, framework, sprint, desc);
    const token = auth_pengjajar;

    let image = {
      uri: this.state.uri,
      type: this.state.type,
      name: this.state.fileName,
    };

    const formData = new FormData();

    formData.append('divisi', divisi);
    formData.append('framework', framework);
    formData.append('sprint', sprint);
    formData.append('desc', desc);
    formData.append('image', image);

    console.log(formData);

    fetch('https://api.pondokprogrammer.com/api/kurikulum', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const {picker, framework, jumlahSprint, deskripsi, fileName} = this.state;
    return (
      <View style={styles.container}>
        <Navbar name="Buat Kurikulum" />
        <ScrollView style={styles.scrollview}>
          <View
            style={{
              height: 150,
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}>
            <Image
              style={{height: 130, width: '80%', resizeMode: 'contain'}}
              source={this.state.avatarSource}
            />
          </View>
          <View
            style={{
              height: 60,
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              delayPressIn={10}
              activeOpacity={0.5}
              style={{
                height: 40,
                width: '80%',
                borderRadius: 5,
                backgroundColor: 'rgb(0,184,150)',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.pickerImage()}>
              <Icon name="camera" size={20} color="white" />
            </TouchableOpacity>
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
                <Picker.Item label="Backend" value="1" />
                <Picker.Item label="Frontend" value="2" />
                <Picker.Item label="Mobile" value="3" />
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
              placeholder="Framework"
              value={this.state.framework}
              onChangeText={text => this.setState({framework: text})}
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
              placeholder="Jumlah Sprint"
              value={this.state.jumlahSprint}
              keyboardType="numeric"
              onChangeText={text => this.setState({jumlahSprint: text})}
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
              height: 220,
              width: '100%',
              padding: 10,
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Deskripsi Jurusan"
              value={this.state.deskripsi}
              textAlignVertical="top"
              onChangeText={text => this.setState({deskripsi: text})}
              style={{
                height: 200,
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
              delayPressIn={10}
              onPress={() =>
                this.postData(
                  picker,
                  framework,
                  jumlahSprint,
                  deskripsi,
                  fileName,
                )
              }>
              <Text style={styles.textButton}>Simpan</Text>
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

export default BuatKurikulumCreate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    height: 40,
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
