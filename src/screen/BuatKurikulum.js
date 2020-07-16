import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
  Image,
  Dimensions,
} from 'react-native';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import AddButton from '../components/AddButton';
import {auth_kurikulum} from '../config/utils';

const axios = require('axios');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class BuatKurikulum extends React.Component {
  state = {
    data: [],
    refreshing: false,
    status: true,
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const token = auth_kurikulum;
    this.setState({refreshing: true});

    axios
      .get('https://api.pondokprogrammer.com/api/kurikulum', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        this.setState({data: response.data, refreshing: false, status: true});
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Data gagal didapatkan',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setState({refreshing: false, status: false});
      });
  };
  onRefreshScreen = () => {
    this.getData();
  };

  previewKurikulum = value => {
    this.props.navigation.navigate('PreviewKurikulum', {
      id: value.id,
      img: value.img,
      division: value.division,
      framework: value.framework,
      description: value.description,
      sprint: value.sprint.length,
    });
  };

  renderListScreen = () => {
    if (this.state.status) {
      return this.state.data.map((value, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            delayPressIn={10}
            key={key}
            onPress={() => this.previewKurikulum(value)}>
            <View style={styles.ListBox}>
              <Image
                source={{
                  uri: `http://api.pondokprogrammer.com/img/kurikulum/${
                    value.img
                  }`,
                }}
                style={styles.imageKurikulum}
              />
              <View style={styles.boxFrameworkTitle}>
                <Text style={styles.frameworkTitle}>{value.framework}</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    } else {
      return (
        <View style={styles.backgroundOffline}>
          <Image
            source={require('../assets/images/noconnectionlogo.png')}
            style={styles.imageOffline}
          />
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Navbar name="Buat Kurikulum" />
        <ScrollView
          style={{flex: 1}}
          refreshControl={
            <RefreshControl
              colors={['rgb(0,184,150)']}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefreshScreen()}
            />
          }>
          {this.renderListScreen()}
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
  ListBox: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: 'white',
  },
  imageKurikulum: {
    height: 150,
    width: '95%',
  },
  boxFrameworkTitle: {
    height: 50,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameworkTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'grey',
  },
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
});
