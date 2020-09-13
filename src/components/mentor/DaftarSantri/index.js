//import liraries
import React, {Component} from 'react';
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
  ToastAndroid,
} from 'react-native';

import Spinner from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';

const axios = require('axios');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class MenuPilihSantri extends Component {
  constructor(props) {
    super();
    this.state = {
      id_santri: '',
    };
  }

  componentDidMount() {
    const {id_santri} = this.props.route.params;
    this.setState({id_santri: id_santri});
  }

  render() {
    console.log(this.state.id_santri);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View
          style={{
            height: 40,
            backgroundColor: 'rgb(0, 184, 150)',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#fff', fontWeight: 'bold'}}>
            Menu Pilihan
          </Text>
        </View>
        <View style={{margin: 20, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('VideoPilihSantri', {
                id_santri: this.state.id_santri,
              })
            }
            style={{
              margin: 30,
              height: 100,
              backgroundColor: '#C9DFCA',
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Icon name="youtube-play" size={50} color="red" />
            <Text style={{fontWeight: 'bold', fontSize: 17}}>List Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('KompotensiPilihSantri', {
                id_santri: this.state.id_santri,
              })
            }
            style={{
              margin: 30,
              height: 100,
              backgroundColor: '#C9DFCA',
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Icon name="university" size={50} color="rgb(0, 184, 150)" />
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              Standar Kompotensi
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('Tugas', {
                id_santri: this.state.id_santri,
              })
            }
            style={{
              margin: 30,
              height: 100,
              backgroundColor: '#C9DFCA',
              width: '80%',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}>
            <Icon name="university" size={50} color="rgb(0, 184, 150)" />
            <Text style={{fontWeight: 'bold', fontSize: 17}}>
              Tugas Harian Santri
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect(mapStateToProps)(MenuPilihSantri);
