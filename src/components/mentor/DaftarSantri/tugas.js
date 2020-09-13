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

import Spinner from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Navbar from '../../Navbar';
import BackButton from '../../BackButton';
import AddButton from '../../AddButton';

const axios = require('axios');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class Tugas extends React.Component {
  state = {
    data: [],
    refreshing: false,
    status: true,
    animationLoad: false,
    id_santri: this.props.route.params.id_santri,
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    this.setState({refreshing: true, animationLoad: true});

    axios
      .get(
        `https://api.pondokprogrammer.com/api/daily_task/student/${
          this.state.id_santri
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const data = response.data;
        if (data.status == 'success' || null) {
          this.setState({
            data: data.data,
            refreshing: false,
            status: true,
            animationLoad: false,
          });
        } else {
          this.setState({
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

  previewKurikulum = value => {
    this.props.navigation.navigate('BuatTugasHarian2', {
      id: value.id,
      img: value.img,
      division: value.division,
      framework: value.framework,
      description: value.description,
      sprint: value.sprint.length,
      division_id: value.division_id,
    });
  };

  approved = value => {
    const data = this.props.authentication;
    const token = data.token;
    this.setState({refreshing: true, animationLoad: true});

    axios
      .put(
        `https://api.pondokprogrammer.com/api/daily_task/student/${value.id}`,
        {
          is_approved: '1',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const data = response.data;
        console.log(data);
        if (data.status == 'success' || null) {
          console.log(data);
          this.setState({
            refreshing: false,
            status: true,
            animationLoad: false,
          });
          this.getData();
          ToastAndroid.show(
            'Telah diverifikasi',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          this.setState({
            refreshing: false,
            status: true,
            animationLoad: false,
          });
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Netwok error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setState({refreshing: false, status: false, animationLoad: false});
      });
  };

  cancelled = value => {
    const data = this.props.authentication;
    const token = data.token;
    this.setState({refreshing: true, animationLoad: true});

    axios
      .put(
        `https://api.pondokprogrammer.com/api/daily_task/student/${value.id}`,
        {
          is_approved: '0',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const data = response.data;
        if (data.status == 'success' || null) {
          this.setState({
            refreshing: false,
            status: true,
            animationLoad: false,
          });
          this.getData();
          ToastAndroid.show(
            'Berhasil dibatalkan',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          this.setState({
            refreshing: false,
            status: true,
            animationLoad: false,
          });
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Netwok error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setState({refreshing: false, status: false, animationLoad: false});
      });
  };
  renderListScreen = () => {
    if (this.state.status) {
      return this.state.data.map((value, key) => {
        if (value.is_approved == '0') {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              delayPressIn={10}
              key={key}
              onPress={() => this.approved(value)}>
              <View
                style={{
                  ...styles.ListBox,
                  height: 100,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'red',
                }}>
                <Text>{value.task}</Text>
              </View>
            </TouchableOpacity>
          );
        } else if (value.is_approved == '1') {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              delayPressIn={10}
              key={key}
              onPress={() => this.cancelled(value)}>
              <View
                style={{
                  ...styles.ListBox,
                  height: 100,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'lime',
                }}>
                <Text>{value.task}</Text>
              </View>
            </TouchableOpacity>
          );
        }
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
            source={require('../../../assets/images/noconnectionlogo.png')}
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
        <Navbar name="Tugas harian Check" />
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

export default connect(mapStateToProps)(Tugas);

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
