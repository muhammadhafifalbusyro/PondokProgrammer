//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const axios = require ('axios');
import Loader from '../components/Santri/PMD/loader';

const windowWidth = Dimensions.get ('window').width;

// create a component
const LupaPassword = ({navigation}) => {
  const [email, setEmail] = useState ('');
  const [isLoader, setisLoader] = useState (false);

  const kirimPassword = () => {
    setisLoader (true);
    if (email.length == 0) {
      setisLoader ({isLoader: false});
      ToastAndroid.show (
        'Email Tidak Boleh Kosong !',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      axios
        .post ('https://api.pondokprogrammer.com/api/password/email', {
          email: email,
        })
        .then (res => {
          ToastAndroid.show (
            `${res.data.status}`,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
          setisLoader (false);
          navigation.goBack()
        })
        .catch (err => {
          setisLoader (false);
          ToastAndroid.show (
            'Terjadi Kesalahan, Pasti Email Anda Sudah Terdaftar !',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
          );
        });
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://apps.telkomakses.co.id/sso/assets/img/sso_ta.png',
        }}
        style={{height: 100, width: 100}}
      />
      <Loader loading={isLoader} />
      <TextInput
        placeholder="Masukan Email Akun Anda"
        onChangeText={email => setEmail (email)}
        style={{
          marginTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#007CB5',
        }}
      />
      <TouchableOpacity
        onPress={() => kirimPassword ()}
        style={{
          height: 30,
          width: windowWidth - 150,
          backgroundColor: '#007CB5',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          borderRadius: 20,
        }}
      >
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default LupaPassword;
