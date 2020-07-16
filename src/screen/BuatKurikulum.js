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
import {auth_pengjajar} from '../config/utils';
const axios = require('axios');

class BuatKurikulum extends React.Component {
  state = {
    data: [],
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const token = auth_pengjajar;

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
                        backgroundColor: 'orange',
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
