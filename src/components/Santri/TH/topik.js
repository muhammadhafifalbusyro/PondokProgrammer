import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import Loader from '../PMD/loader';

const axios = require('axios');

class TopikTugasHarian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topik: '',
      id_topik: '',
      refreshing: false,
      status: true,
      animationLoad: false,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getTopik_id();
    setTimeout(() => {
      this.getData();
    }, 2000);
  }

  getTopik_id = () => {
    const data = this.props.authentication;
    const token = data.token;
    const jurusan_id = this.props.jurusan_id.jurusan_id;
    const {Sprint} = this.props.route.params;

    this.setState({refreshing: true, animationLoad: true});
    axios
      .get(
        `https://api.pondokprogrammer.com/api/curriculum/${jurusan_id}/${Sprint}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const data = response.data.topik[0];
        this.setState({
          id_topik: data.id,
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
        this.setState({
          refreshing: false,
          status: false,
          animationLoad: false,
        });
      });
  };

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    const jurusan_id = this.props.jurusan_id.jurusan_id;
    const {Sprint} = this.props.route.params;
    const {id_topik} = this.state;

    this.setState({refreshing: true, animationLoad: true});
    axios
      .get(
        `https://api.pondokprogrammer.com/api/curriculum/${jurusan_id}/${Sprint}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const data = response.data.topik;
        console.log(data);
        this.setState({
          topik: data,
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
        this.setState({
          refreshing: false,
          status: false,
          animationLoad: false,
        });
      });
  };

  onRefreshScreen = () => {
    this.getData();
  };

  renderListScreen = () => {
    const {topik} = this.state;
    const lengthData = topik.length;
    const {Sprint} = this.props.route.params;
    if (lengthData === 0) {
      return (
        <View style={styles.nodata}>
          <Text style={styles.Tnodata}>Tidak Ada Data</Text>
        </View>
      );
    } else if (this.state.status) {
      return this.state.topik.map((value, key) => {
        const topik_id = value.topik_id;
        return (
          <View style={styles.mainDetail} key={key}>
            <TouchableOpacity
              style={styles.flexCheckbox}
              onPress={() =>
                this.props.navigation.navigate('DetailDailyTask', {
                  Sprint: Sprint,
                  id_topik: value.topik_id,
                })
              }>
              <View style={styles.viewLabel}>
                <View style={{width: '85%'}}>
                  <Text style={styles.label}>{value.judul}</Text>
                </View>
                <View style={{justifyContent: 'center', marginRight: 10}}>
                  <Icon name="arrow-right" size={20} color="#fff" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        );
      });
    } else {
      return (
        <View style={styles.backgroundOffline}>
          <View
            style={{
              height: 40,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Spinner
              type="Bounce"
              color="rgb(0,184,150)"
              isVisible={this.state.animationLoad}
            />
          </View>
          {/* <Image
            source={require ('../../../assets/images/tidakadainternet.png')}
            style={styles.imageOffline}
          /> */}
          <Text>Tidak Ada Internet</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            delayPressIn={10}
            onPress={() => this.getData()}>
            <Icon
              name="refresh"
              color="rgb(0,184,150)"
              size={40}
              style={{marginTop: 30}}
            />
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    const {Sprint} = this.props.route.params;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View style={styles.header}>
          <Text style={styles.pmd}> Topik {Sprint} </Text>
        </View>
        <Loader loading={this.state.isLoading} />
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
        <TouchableOpacity
          style={styles.TouchableOpacityStyle}
          onPress={() => this.props.navigation.goBack()}>
          <Icon name="arrow-left" size={40} color="rgb(0, 184, 150)" />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication, jurusan_id} = state.reducers;
  return {authentication, jurusan_id};
};

export default connect(mapStateToProps)(TopikTugasHarian);
