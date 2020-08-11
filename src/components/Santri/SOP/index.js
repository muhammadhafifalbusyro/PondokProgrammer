import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  RefreshControl,
  ScrollView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
const axios = require('axios');

class SOP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      status: true,
      animationLoad: false,
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    const role = data.role;
    this.setState({refreshing: true, animationLoad: true});

    axios
      .get(
        `http://api.pondokprogrammer.com/api/standar_operasional?status=${role}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        // console.log (response.data);
        this.setState({
          data: response.data,
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
    const data = this.state.data;
    const lengthData = data.length;
    if (lengthData === 0) {
      return (
        <View style={styles.nodata}>
          <Text style={styles.Tnodata}>Tidak Ada Data</Text>
        </View>
      );
    } else if (this.state.status) {
      return this.state.data.map((value, key) => {
        return (
            <View style={styles.subSop} key={key}>
              <Text style={styles.t_sop}>{key + 1}.</Text>
              <Text style={styles.t_sop}>{value.std_operasional}</Text>
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
            source={require('../../../assets/images/noconnectionlogo.png')}
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
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View style={styles.header}>
          <Text style={styles.sop}> SOP </Text>
        </View>
        <View style={styles.mainSOP}>
          {/* <View style={styles.subSop}>
            <Text>1. SOP</Text>
          </View> */}
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
        </View>
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
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect(mapStateToProps)(SOP);
