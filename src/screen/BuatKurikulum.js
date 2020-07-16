import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import AddButton from '../components/AddButton';
import Icon from 'react-native-vector-icons/FontAwesome';
const axios = require('axios');

class BuatKurikulum extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const token =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBpLnBvbmRva3Byb2dyYW1tZXIuY29tXC9hcGlcL3N0dWRlbnRfbG9naW4iLCJpYXQiOjE1OTQ4NjA2ODIsImV4cCI6MTU5NDg2NDI4MiwibmJmIjoxNTk0ODYwNjgyLCJqdGkiOiJYZlRBOFd6cDA4NFppc2ZHIiwic3ViIjozOCwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.v89Nt_sQYM910iAvqUG7yzClZ6B5--6Baz_cydyljP8';

    axios
      .get('https://api.pondokprogrammer.com/api/kurikulum', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        this.setState({data: response.data});
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Data gagal didapatkan',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };
  render() {
    return (
      <View style={styles.container}>
        <Navbar name="Buat Kurikulum" />
        <ScrollView style={{flex: 1}}>
          {this.state.data.map((value, key) => {
            return (
              <View
                style={{
                  height: 160,
                  width: '100%',
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  marginBottom: 10,
                }}
                key={key}>
                <ImageBackground
                  source={{
                    uri: `http://api.pondokprogrammer.com/img/kurikulum/${
                      value.img
                    }`,
                  }}
                  style={{height: 160, width: '100%'}}>
                  <View
                    style={{
                      height: 80,
                      width: '100%',
                    }}>
                    <View
                      style={{
                        height: 30,
                        width: 100,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,184,150,0.8)',
                      }}>
                      <Text style={{fontWeight: 'bold', color: 'white'}}>
                        {value.division}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      height: 80,
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      delayPressIn={10}
                      style={{
                        height: 40,
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgb(0,184,150)',
                      }}>
                      <Text style={{fontWeight: 'bold', color: 'white'}}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      delayPressIn={10}
                      style={{
                        height: 40,
                        width: '50%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'red',
                      }}>
                      <Text style={{fontWeight: 'bold', color: 'white'}}>
                        Hapus
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <AddButton
          params={() => this.props.navigation.navigate('BuatKurikulumCreate')}
        />
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

export default BuatKurikulum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
