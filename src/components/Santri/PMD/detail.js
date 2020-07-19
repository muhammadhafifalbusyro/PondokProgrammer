import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from '@react-native-community/checkbox';
import {styles} from './styles';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';

const axios = require ('axios');

class DetailPemahamanMateriDasar extends Component {
  constructor (props) {
    super (props);
    this.state = {
        isSelected : false,
        topik: [],
        refreshing: false,
        status: true,
        animationLoad: false,
        Sprint: ''
    };
  }

  setSelection = () => {
      this.setState({
          isSelected : !this.state.isSelected
      })
  }

  componentDidMount () {
      this.setState({
        Sprint :  this.props.route.params
      })
    this.getData ();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    const jurusan_id = this.props.jurusan_id.jurusan_id;
    const { Sprint } = this.state.Sprint
    this.setState ({refreshing: true, animationLoad: true});

    axios
      .get (`http://api.pondokprogrammer.com/api/curriculum/${jurusan_id}/${Sprint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then (response => {
        const data = response;
        console.log (data);
        // this.setState ({
        //   sprint: response.data.sprint,
        //   refreshing: false,
        //   status: true,
        //   animationLoad: false,
        // });
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

  onRefreshScreen = () => {
    this.getData ();
  };

  renderListScreen = () => {
    const sprint = this.state.sprint;
    const lengthData = sprint.length;
    if (lengthData === 0) {
      return (
        <View style={styles.nodata}>
          <Text style={styles.Tnodata}>Tidak Ada Data</Text>
        </View>
      );
    } else if (this.state.status) {
      return this.state.sprint.map ((value, key) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            delayPressIn={10}
            key={key}
            onPress={() => this.props.navigation.navigate ('DetailMateriDasar')}
            style={styles.subPMD}
          >
            <View style={styles.flexbox}>
              <View style={styles.widthBox}>
                <Text style={styles.Tlist}>{value.sprint} </Text>
              </View>
              <View style={styles.iconBox}>
                <Icon name="arrow-right" size={20} color="rgb(0, 184, 150)" />
              </View>
            </View>
          </TouchableOpacity>
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
            }}
          >
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
            onPress={() => this.getData ()}
          >
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

  

  render () {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View style={styles.header}>
          <Text style={styles.pmd}> {this.state.Sprint} </Text>
        </View>
        <View style={styles.mainDetail}>
          <View style={styles.flexCheckbox}>
            <CheckBox
              value={this.state.isSelected}
              onValueChange={() => this.setSelection()}
            />
             <Text style={styles.label}>Do you like React Native?</Text>
             
          </View>
          <View style={styles.flexCheckbox}>
            <CheckBox
              value={this.state.isSelected}
              onValueChange={() => this.setSelection()}
            />
             <Text style={styles.label}>Do you like React Native?</Text>
          </View>
          <View style={styles.mainSubmit}>
            <TouchableOpacity style={styles.submit}>
              <Text style={styles.Tsubmit}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.TouchableOpacityStyle}
          onPress={() => this.props.navigation.goBack ()}
        >
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

export default connect (mapStateToProps) (DetailPemahamanMateriDasar);

