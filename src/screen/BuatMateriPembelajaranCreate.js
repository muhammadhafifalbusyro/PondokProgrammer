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

class BuatMateriPembelajaranCreate extends React.Component {
  state = {
    data: [],
    refreshing: false,
    status: true,
    animationLoad: false,
    curriculum_id: this.props.route.params.id,
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    this.setState({refreshing: true, animationLoad: true});
    let curriculum_id = this.state.curriculum_id;
    console.log('ini adalah =' + curriculum_id);
    axios
      .get(`https://api.pondokprogrammer.com/api/curriculum/${curriculum_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data.sprint,
          refreshing: false,
          status: true,
          animationLoad: false,
        });
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

  previewKurikulum = (sprint, curriculum_id) => {
    this.props.navigation.navigate('BuatTopik', {
      sprint: sprint,
      curriculum_id: curriculum_id,
    });
  };

  renderListScreen = () => {
    let curriculum_id = this.state.curriculum_id;
    if (this.state.status) {
      return this.state.data.map((value, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            delayPressIn={10}
            key={key}
            onPress={() => this.previewKurikulum(key + 1, curriculum_id)}>
            <View style={styles.ListBox}>
              <Text style={{fontSize: 16, color: 'grey', fontWeight: 'bold'}}>
                {value.sprint}
              </Text>
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
        <Navbar name="Pilih Sprint" />
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
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect(mapStateToProps)(BuatMateriPembelajaranCreate);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ListBox: {
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 5,
    shadowOffset: {width: 5, height: 5},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 1,
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
