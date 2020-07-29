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

class BuatTopik extends React.Component {
  state = {
    dataSprint: null,
    dataTopik: [],
    refreshing: false,
    status: true,
    animationLoad: false,
    curriculum_id: this.props.route.params.curriculum_id,
    sprint: this.props.route.params.sprint,
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    let curriculum_id = this.state.curriculum_id;
    let sprint = this.state.sprint;

    console.log(`ini adalah kurikulum sprint = ${sprint}`);

    this.setState({refreshing: true, animationLoad: true});

    axios
      .get(
        `https://api.pondokprogrammer.com/api/curriculum/${curriculum_id}/sprint ${sprint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        console.log(response.data);
        console.log(response.data.topik);
        this.setState({
          dataSprint: response.data,
          dataTopik: response.data.topik,
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

  previewMateri = value => {
    console.log('valueee= ' + value);
    this.props.navigation.navigate('PreviewMateri', {
      materi: value,
    });
  };

  renderListScreen = () => {
    if (this.state.status) {
      return this.state.dataTopik.map((value, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            delayPressIn={10}
            key={key}
            onPress={() => this.previewMateri(value)}>
            <View style={styles.ListBox}>
              <Text style={{fontSize: 16, color: 'grey', fontWeight: 'bold'}}>
                {value.judul}
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
        <Navbar name="Materi Pembelajaran" />
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
          params={() => {
            if (this.state.dataSprint == null) {
              ToastAndroid.show(
                'Tidak bisa mengambil ID Sprint',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
            } else {
              this.props.navigation.navigate('BuatTopikCreate', {
                data: this.state.dataSprint,
              });
            }
          }}
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

export default connect(mapStateToProps)(BuatTopik);

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
