import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  ToastAndroid,
  Alert,
  RefreshControl,
  TouchableWithoutFeedback,
} from 'react-native';
import Navbar from '../components/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import {AccordionList} from 'accordion-collapse-react-native';
import BackButton from '../components/BackButton';

const axios = require('axios');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class PreviewKelas extends React.Component {
  state = {
    refreshing: false,
    qrVisible: false,
    data: [],
    peserta: [],
    status: true,
    animationLoad: false,
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    const id = this.props.route.params.id;
    this.setState({refreshing: true, animationLoad: true});
    axios
      .get(`http://api.pondokprogrammer.com/api/class/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        this.setState({
          data: response.data,
          peserta: response.data.student,
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
  deleteData = () => {
    const data = this.props.authentication;
    const token = data.token;
    const id = this.props.route.params.id;
    this.setState({refreshing: true, animationLoad: true});
    axios
      .delete(`http://api.pondokprogrammer.com/api/class/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
        ToastAndroid.show(
          'Data berhasil dihapus',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setState({
          refreshing: false,
        });
        this.props.navigation.goBack();
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
        });
      });
  };
  cautionDelete = () => {
    Alert.alert(
      'Hapus Materi',
      'Apa anda yakin ingin menghapusnya ?',
      [
        {
          text: 'Tidak',
          onPress: () => {
            return false;
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            this.deleteData();
          },
        },
      ],
      {cancelable: false},
    );
  };
  onRefreshScreen = () => {
    this.getData();
  };
  renderListScreen = () => {
    if (this.state.status) {
      return (
        <ScrollView
          style={{flex: 1}}
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              colors={['rgb(0,184,150)']}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefreshScreen()}
            />
          }>
          <View style={styles.ListBox}>
            <View style={styles.imageKurikulum}>
              <Text style={styles.titleImage}>{this.state.data.materi} </Text>
            </View>
          </View>
          <View style={styles.containerButtonCamera}>
            <TouchableOpacity
              delayPressIn={10}
              activeOpacity={0.5}
              style={{...styles.boxButtonCamera, marginRight: 10}}
              onPress={() => this.setState({qrVisible: true})}>
              <Icon name="qrcode" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.cautionDelete()}
              delayPressIn={10}
              activeOpacity={0.5}
              style={{
                ...styles.boxButtonCamera,
                height: 40,
                width: 110,
                backgroundColor: 'red',
              }}>
              <Text style={{fontWeight: 'bold', color: 'white'}}>
                Hapus Kelas
              </Text>
            </TouchableOpacity>
          </View>
          <View />
          <View>
            <View style={styles.boxPesertaNotif}>
              <Text style={styles.textPeserta}>Peserta</Text>
              <Text style={styles.textPeserta}>
                {this.state.peserta.length} orang
              </Text>
            </View>
            {this.state.peserta.map((value, key) => {
              return (
                <View style={styles.boxListPeserta} key={key}>
                  <View style={styles.boxNumber}>
                    <Text style={styles.textNumber}>{key + 1}</Text>
                  </View>
                  <View style={styles.boxName}>
                    <Text style={styles.textName}>{value.username}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      );
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
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.qrVisible}
          onRequestClose={() => {
            this.setState({qrVisible: false});
          }}>
          <TouchableWithoutFeedback
            onPress={() => this.setState({qrVisible: false})}>
            <View style={styles.centeredView}>
              <View style={styles.modalContainer}>
                <Image
                  source={{uri: this.state.data.qrcode}}
                  style={styles.qrcode}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Navbar name="Preview Kelas" />
        {this.renderListScreen()}
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect(mapStateToProps)(PreviewKelas);

const styles = StyleSheet.create({
  ListBox: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: 'white',
  },
  imageKurikulum: {
    height: 190,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,184,150)',
    padding: 15,
  },
  titleImage: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerButtonCamera: {
    height: 70,
    width: '100%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  boxButtonCamera: {
    height: 50,
    width: 50,
    borderRadius: 5,
    backgroundColor: 'rgb(0,184,150)',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: '40%',
    width: '70%',
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrcode: {
    height: '90%',
    width: '90%',
    resizeMode: 'contain',
  },
  textModal: {
    color: 'grey',
    marginTop: 5,
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
  iconRefresh: {
    marginTop: 30,
  },
  acordionHead: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  acordionHeadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  acordionBodyContainer: {
    padding: 10,
  },
  acordionBody: {
    marginBottom: 10,
  },
  acordionBodyText: {
    fontWeight: 'bold',
  },
  boxPesertaNotif: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '12%',
    marginBottom: 5,
  },
  textPeserta: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'grey',
  },
  boxListPeserta: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
  },
  boxNumber: {
    height: '100%',
    width: '10%',
    backgroundColor: 'rgb(0,184,150)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textNumber: {
    fontWeight: 'bold',
    color: 'white',
  },
  boxName: {
    height: '100%',
    width: '90%',
    justifyContent: 'center',
    padding: 5,
  },
  textName: {
    color: 'grey',
  },
});
