import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import BackButton from '../components/BackButton';
import Spinner from 'react-native-spinkit';
const axios = require('axios');

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    no_tlp: '',
    password: '',
    code: '',
    picker: '',
    secureText: true,
    isLoading: false,
  };
  seePassword = () => {
    if (this.state.secureText) {
      return (
        <Text onPress={() => this.setState({secureText: false})}>Lihat</Text>
      );
    } else {
      return (
        <Text onPress={() => this.setState({secureText: true})}>Kunci</Text>
      );
    }
  };
  registrasi = (name, email, password, phone, code, division) => {
    this.setState({isLoading: true});
    if (
      name != '' &&
      email != '' &&
      password != '' &&
      phone != '' &&
      code != '' &&
      division != ''
    ) {
      axios
        .post('https://api.pondokprogrammer.com/api/student_register', {
          name: name,
          email: email,
          password: password,
          password_confirmation: password,
          phone: phone,
          code: code,
          division: division,
        })
        .then(response => {
          if (response.data.status == 'success') {
            this.setState({isLoading: false});
            console.log(response.data.status);
            ToastAndroid.show(
              'Pendaftaran berhasil',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else if (response.data.email) {
            this.setState({isLoading: false});
            console.log(response.data.email[0]);
            ToastAndroid.show(
              response.data.email[0],
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else if (response.data.phone) {
            this.setState({isLoading: false});
            console.log(response.phone[0]);
            ToastAndroid.show(
              response.data.phone[0],
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else if (response.data.password) {
            this.setState({isLoading: false});
            console.log(response.data.password[0]);
            ToastAndroid.show(
              response.data.password[0],
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else if (response.data.code) {
            this.setState({isLoading: false});
            console.log(response.data.code[0]);
            ToastAndroid.show(
              response.data.code[0],
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
          else{
            this.setState({isLoading: false});
            console.log(response.data.status);
            ToastAndroid.show(
              'Pendaftaran berhasil',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.props.navigation.navigate('Login')
          }
        })
        .catch(error => {
          this.setState({isLoading: false});
          console.log(error);
          ToastAndroid.show(
            'Email atau No Telepon Sudah Terdaftar',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    } else {
      this.setState({isLoading: false});
      ToastAndroid.show(
        'Data tidak boleh ada yang kosong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  animationLoading = () => {
    if (this.state.isLoading) {
      return <Spinner visible={true} type="Wave" color="white" />;
    } else {
      return <Text style={styles.textButton}>Daftar Anggota</Text>;
    }
  };
  render() {
    const {username, email, password, no_tlp, code, picker} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Registrasi</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Nama lengkap"
          placeholderTextColor="grey"
          onChangeText={text => this.setState({username: text})}
          value={this.state.username}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={text => this.setState({email: text})}
          value={this.state.email}
          placeholderTextColor="grey"
        />
        <TextInput
          style={styles.textInput}
          placeholder="No Telepon"
          keyboardType="numeric"
          onChangeText={text => this.setState({no_tlp: text})}
          value={this.state.no_tlp}
          placeholderTextColor="grey"
        />
        <View style={styles.boxTextInput}>
          <TextInput
            style={styles.textInput}
            placeholder="Kata Sandi"
            onChangeText={text => this.setState({password: text})}
            value={this.state.password}
            placeholderTextColor="grey"
            secureTextEntry={this.state.secureText}
          />
          {this.seePassword()}
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Kode"
          onChangeText={text => this.setState({code: text})}
          value={this.state.code}
          placeholderTextColor="grey"
        />
        <View style={styles.boxTextInput}>
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
            <Picker.Item label="Pilih Divisi" value="0" color="grey" />
            <Picker.Item label="Backend" value="1" />
            <Picker.Item label="Frontend" value="2" />
            <Picker.Item label="Mobile" value="3" />
          </Picker>
        </View>
        <TouchableOpacity
          onPress={() =>
            this.registrasi(username, email, password, no_tlp, code, picker)
          }
          style={styles.button}
          activeOpacity={0.5}
          delayPressIn={10}>
          {this.animationLoading()}
        </TouchableOpacity>
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgb(0,184,150)',
    margin: 30,
  },
  textInput: {
    height: 40,
    width: '80%',
    borderBottomWidth: 1,
    borderColor: 'rgb(0,184,150)',
  },
  boxTextInput: {
    height: 40,
    width: '80%',
    borderBottomWidth: 1,
    borderColor: 'rgb(0,184,150)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: '80%',
    fontSize: 16,
    borderRadius: 3,
    padding: 10,
    backgroundColor: 'rgb(0,184,150)',
    marginTop: 50,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  picker: {
    height: 40,
    width: '100%',
    color: 'grey',
  },
});

