import React from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  Dimensions,
  ToastAndroid
} from 'react-native';

import Spinner from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const axios = require ('axios');
const windowWidth = Dimensions.get ('window').width;
const windowHeight = Dimensions.get ('window').height;

class DaftarSantri extends React.Component {
  state = {
    data: [],
    refreshing: false,
    status: true,
    animationLoad: false,
  };

  componentDidMount () {
    this.getData ();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    this.setState ({refreshing: true, animationLoad: true});

    axios
      .get ('https://api.pondokprogrammer.com/api/mentor/student', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then (response => {
        const data = response.data;
        console.log (data);
        if (data.status || null) {
          this.setState ({
            data: [],
            refreshing: false,
            status: true,
            animationLoad: false,
          });
        } else {
          this.setState ({
            data: data,
            refreshing: false,
            status: true,
            animationLoad: false,
          });
        }
      })
      .catch (error => {
        console.log (error);
        ToastAndroid.show (
          'Data gagal didapatkan',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        this.setState ({
          refreshing: false,
          status: false,
          animationLoad: false,
        });
      });
  };

  renderListScreen = () => {
    if (this.state.status) {
      return this.state.data.map ((value, key) => {
        const jurusan = value.framework ? <Text> {value.framework}</Text> : <Text style={{color: 'red', fontSize : 11, textAlign : 'center'}}>  Belum Pilih Jurusan</Text> 
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            delayPressIn={10}
            key={key}
            onPress={() => alert ()}
          >
            <View style={{flex: 1, margin: 20}}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{
                    uri: `https://api.pondokprogrammer.com/img/profile/${value.image}`,
                  }}
                  style={{height: 30, width: 30,borderRadius : 20}}
                />
                <View style={{paddingLeft : 5}}>
                  <Text style={{fontSize : 18, fontWeight : 'bold'}}>{value.username}</Text>
                  <View style={{flexDirection : 'row'}}>
                  <Text>{value.division}</Text>
                  <Text style={{marginLeft : 10, textAlignVertical : 'center'}}>{jurusan}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    } else {
      return (
        <View style={styles.backgroundOffline}>
          <View style={styles.boxSpinner}>
            <Spinner
              type="Bounce"
              color="rgb(0,184,150)"
              isVisible={this.state.animationLoad}
            />
          </View>
          <Image
            source={require ('../assets/images/noconnectionlogo.png')}
            style={styles.imageOffline}
          />
          <TouchableOpacity
            style={styles.iconRefresh}
            activeOpacity={0.5}
            delayPressIn={10}
            onPress={() => this.getData ()}
          >
            <Icon name="refresh" color="rgb(0,184,150)" size={40} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  onRefreshScreen = () => {
    this.getData();
  };

  render () {
    return (
      <View style={{flex: 1}}>
        <StatusBar backgroundColor="rgb(0,184,150)" />
        <View
          style={{
            height: 50,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(0,184,150)',
          }}
        >
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            Daftar Santri Pondok Programmer
          </Text>
        </View>
        <ScrollView
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              colors={['rgb(0,184,150)']}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefreshScreen ()}
            />
          }
        >
          {this.renderListScreen ()}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect (mapStateToProps) (DaftarSantri);

const styles = StyleSheet.create ({
  backgroundOffline: {
    height: windowHeight - 50,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageOffline: {
    height: 100,
    width: 100,
  },
  boxSpinner: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  iconRefresh: {
    marginTop: 30,
  },
});
