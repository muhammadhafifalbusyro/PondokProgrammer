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
  Modal,
  TextInput,
  Alert,
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

class BuatStandarKompetensiCreate3 extends React.Component {
  state = {
    data: [],
    refreshing: false,
    status: true,
    animationLoad: false,
    topik_id: this.props.route.params.materi.id,
    modalVisible: false,
    modalVisible2: false,
    modalVisible3: false,
    valueStandarKompetensi: '',
    valueStandarKompetensiUpdate: '',
    standarKompetensiID: '',
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;

    this.setState({refreshing: true, animationLoad: true});

    axios
      .get(`https://api.pondokprogrammer.com/api/standar_kompetensi`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        console.log(response.data);
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
        this.setState({refreshing: false, status: false, animationLoad: false});
      });
  };
  onRefreshScreen = () => {
    this.getData();
  };

  buatStandarKompetensi = () => {
    let data = this.props.authentication;
    let token = data.token;
    console.log(this.state.topik_id);
    console.log(this.state.valueStandarKompetensi);

    if (this.state.valueStandarKompetensi != '') {
      this.setState({
        modalVisible2: true,
        modalVisible: false,
        valueStandarKompetensi: '',
      });
      fetch('https://api.pondokprogrammer.com/api/standar_kompetensi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${token}`,
        },
        body: JSON.stringify({
          topik_id: this.state.topik_id,
          std_kompetensi: this.state.valueStandarKompetensi,
        }),
      })
        .then(res => res.json())
        .then(json => {
          if (json.status) {
            console.log(json.status);
            this.setState({modalVisible2: false});
            this.getData();
            ToastAndroid.show(
              'Data berhasil ditambahkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            this.setState({modalVisible2: false});
            ToastAndroid.show(
              'Data gagal ditambahkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        })
        .catch(er => {
          this.setState({modalVisible2: false});
          console.log(er);
          ToastAndroid.show(
            'Network error',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    } else {
      ToastAndroid.show(
        'Data tidak boleh kosong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  fieldUpdate = (value, value2) => {
    this.setState({
      modalVisible3: true,
      valueStandarKompetensiUpdate: value,
      standarKompetensiID: value2,
    });
  };
  ubahStandarKompetensi = () => {
    let data = this.props.authentication;
    let token = data.token;
    console.log(this.state.topik_id);
    console.log(this.state.valueStandarKompetensiUpdate);

    if (this.state.valueStandarKompetensiUpdate != '') {
      this.setState({
        modalVisible2: true,
        modalVisible3: false,
        valueStandarKompetensiUpdate: '',
      });
      fetch(
        `https://api.pondokprogrammer.com/api/standar_kompetensi/${
          this.state.standarKompetensiID
        }`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer${token}`,
          },
          body: JSON.stringify({
            topik_id: this.state.topik_id,
            std_kompetensi: this.state.valueStandarKompetensiUpdate,
          }),
        },
      )
        .then(res => res.json())
        .then(json => {
          if (json.status) {
            console.log(json.status);
            this.setState({modalVisible2: false});
            this.getData();
            ToastAndroid.show(
              'Data berhasil ubah',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          } else {
            this.setState({modalVisible2: false});
            ToastAndroid.show(
              'Data gagal ditambahkan',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        })
        .catch(er => {
          this.setState({modalVisible2: false});
          console.log(er);
          ToastAndroid.show(
            'Network error',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    } else {
      ToastAndroid.show(
        'Data tidak boleh kosong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  deleteData = paramID => {
    let data = this.props.authentication;
    let token = data.token;
    this.setState({modalVisible2: true, modalVisible3: false});
    fetch(
      `https://api.pondokprogrammer.com/api/standar_kompetensi/${paramID}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${token}`,
        },
      },
    )
      .then(res => res.json())
      .then(json => {
        this.getData();
        this.setState({modalVisible2: false});
        console.log(json);
        ToastAndroid.show(
          'Data berhasil dihapus',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .catch(er => {
        this.setState({modalVisible2: false});
        console.log(er);
        ToastAndroid.show(
          'Network error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };
  cautionDelete = value => {
    Alert.alert(
      'Hapus Standar Kompetensi',
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
            this.deleteData(value);
          },
        },
      ],
      {cancelable: false},
    );
  };
  renderListScreen = () => {
    if (this.state.status) {
      return this.state.data.map((value, key) => {
        if (value.topik_id == this.state.topik_id) {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              delayPressIn={10}
              key={key}
              onPress={() => this.fieldUpdate(value.std_kompetensi, value.id)}>
              <View style={styles.ListBox} key={key}>
                <Text style={styles.boxTitle}>{value.std_kompetensi}</Text>
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
    const {standarKompetensiID} = this.state;
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalContainer}>
              <TextInput
                multiline={true}
                placeholder="Tuliskan Standar Kompetensi"
                value={this.state.valueStandarKompetensi}
                onChangeText={text =>
                  this.setState({valueStandarKompetensi: text})
                }
                style={styles.textInput}
              />
              <View style={styles.centeredModalButton}>
                <TouchableOpacity
                  onPress={() => this.buatStandarKompetensi()}
                  style={styles.button}
                  activeOpacity={0.5}
                  delayPressIn={10}>
                  <Text style={styles.textButton}>Buat</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible: false})}
                  style={{...styles.button, backgroundColor: 'red'}}
                  activeOpacity={0.5}
                  delayPressIn={10}>
                  <Text style={styles.textButton}>Batal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible2}
          onRequestClose={() => {
            ToastAndroid.show(
              'Tunggu proses sampai selesai',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }}>
          <View style={styles.centeredView2}>
            <View style={styles.modalContainer2}>
              <Spinner visible={true} type="Wave" color="rgb(0,184,150)" />
              <Text style={styles.textModal}>Loading</Text>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible3}
          onRequestClose={() => {
            this.setState({modalVisible3: false});
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalContainer}>
              <TextInput
                multiline={true}
                placeholder="Tuliskan Standar Kompetensi"
                value={this.state.valueStandarKompetensiUpdate}
                onChangeText={text =>
                  this.setState({valueStandarKompetensiUpdate: text})
                }
                style={styles.textInput}
              />
              <View style={styles.centeredModalButton}>
                <TouchableOpacity
                  onPress={() => this.ubahStandarKompetensi()}
                  style={{...styles.button2, backgroundColor: 'orange'}}
                  activeOpacity={0.5}
                  delayPressIn={10}>
                  <Text style={styles.textButton2}>Ubah</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.cautionDelete(standarKompetensiID)}
                  style={{...styles.button2, backgroundColor: 'red'}}
                  activeOpacity={0.5}
                  delayPressIn={10}>
                  <Text style={styles.textButton2}>Hapus</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({modalVisible3: false})}
                  style={styles.button2}
                  activeOpacity={0.5}
                  delayPressIn={10}>
                  <Text style={styles.textButton2}>Kembali</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Navbar name="Standar Kompetensi" />
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
        <AddButton params={() => this.setState({modalVisible: true})} />
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect(mapStateToProps)(BuatStandarKompetensiCreate3);

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: '30%',
    width: '90%',
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    width: '40%',
    fontSize: 16,
    borderRadius: 3,
    padding: 10,
    backgroundColor: 'rgb(0,184,150)',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    height: 35,
    width: '30%',
    fontSize: 16,
    borderRadius: 3,
    padding: 10,
    backgroundColor: 'rgb(0,184,150)',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  textButton2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  textInput: {
    height: 60,
    width: '80%',
    borderColor: 'rgb(0, 184, 150)',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
  },
  scrollview: {
    flex: 1,
  },
  centeredModalButton: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  containerList: {
    height: 70,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 3,
  },
  fieldText: {
    height: 70,
    width: '85%',
    flexDirection: 'row',
  },
  contentNumber: {
    height: 70,
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    backgroundColor: 'rgb(0,184,150)',
  },
  textContentNumber: {
    color: 'white',
  },
  textContentValue: {
    height: 70,
    width: '90%',
    justifyContent: 'center',
    padding: 5,
  },
  trash: {
    height: 70,
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
  },
  centeredView2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer2: {
    height: 100,
    width: 100,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModal2: {
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
  scrollView: {
    flex: 1,
  },
  iconRefresh: {
    marginTop: 30,
  },
  boxTitle: {
    fontSize: 16,
    color: 'grey',
    fontWeight: 'bold',
  },
});
