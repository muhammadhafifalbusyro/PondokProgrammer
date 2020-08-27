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

import Spinner from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const axios = require('axios');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class BuatKelas extends React.Component {
  state = {
    data: [],
    refreshing: false,
    status: true,
    animationLoad: false,
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    this.setState({refreshing: true, animationLoad: true});

    axios
      .get('https://api.pondokprogrammer.com/api/class', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
      const data = response.data;
      if (data.status || null) {
        this.setState ({
          data: data,
          refreshing: false,
          status: true,
          animationLoad: false,
        });
      } else {
        this.setState ({
          data: [],
          refreshing: false,
          status: true,
          animationLoad: false,
        });
      }
    })

      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Data gagal didapatkan',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setState({refreshing: false, status: false, animationLoad: false});
      });
  };
  onRefreshScreen = () => {
    this.getData();
  };

  previewKelas = value => {
    this.props.navigation.navigate('PreviewKelas', {
      id: value.id,
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
            onPress={() => this.previewKelas(value)}>
            <View style={styles.ListBox}>
              <View style={styles.imageKurikulum}>
                <Text style={styles.titleImage}>{value.materi}</Text>
              </View>
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
          <View style={styles.boxSpinner}>
            <Spinner
              type="Bounce"
              color="rgb(0,184,150)"
              isVisible={this.state.animationLoad}
            />
          </View>
          <Image
            source={require('../assets/images/noconnectionlogo.png')}
            style={styles.imageOffline}
          />
          <TouchableOpacity
            style={styles.iconRefresh}
            activeOpacity={0.5}
            delayPressIn={10}
            onPress={() => this.getData()}>
            <Icon name="refresh" color="rgb(0,184,150)" size={40} />
          </TouchableOpacity>
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <Navbar name="Kelas" />
        <ScrollView
          style={styles.scrollView}
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
          params={() => this.props.navigation.navigate('BuatKelasCreate')}
        />
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect(mapStateToProps)(BuatKelas);

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,184,150)',
  },
  titleImage: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxFrameworkTitle: {
    height: 50,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameworkTitle: {
    fontSize: 20,
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
