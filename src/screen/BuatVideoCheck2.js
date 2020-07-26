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

class BuatVideoCheck2 extends React.Component {
  state = {
    data: [],
    refreshing: false,
    status: true,
    animationLoad: false,
    modalVisible: false,
    modalVisible2: false,
    modalVisible3: false,
    valueVideo: '',
    valueVideoUpdate: '',
    videoID: '',
    playlistID: '',
    url_video: '',
    url_videoUpdate: '',
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;

    this.setState({refreshing: true, animationLoad: true});

    axios
      .get(`http://api.pondokprogrammer.com/api/video_pembelajaran`, {
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

  buatVideo = () => {
    let data = this.props.authentication;
    let token = data.token;

    if (this.state.valueVideo != '' && this.state.url_video != '') {
      this.setState({
        modalVisible2: true,
        modalVisible: false,
        valueVideo: '',
        url_video: '',
      });
      fetch('http://api.pondokprogrammer.com/api/video_pembelajaran', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${token}`,
        },
        body: JSON.stringify({
          judul: this.state.valueVideo,
          playlist_id: this.props.route.params.id,
          url_video: this.state.url_video,
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
          } else if (json.url_video) {
            console.log(json.url_video);
            this.setState({modalVisible2: false});
            this.getData();
            ToastAndroid.show(
              'Url video harus valid',
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
  fieldUpdate = (value, value2, value3, value4) => {
    this.setState({
      modalVisible3: true,
      valueVideoUpdate: value,
      videoID: value2,
      url_videoUpdate: value3,
      playlistID: value4,
    });
  };
  ubahVideo = () => {
    let data = this.props.authentication;
    let token = data.token;

    if (this.state.valueVideoUpdate != '' && this.state.url_videoUpdate != '') {
      this.setState({
        modalVisible2: true,
        modalVisible3: false,
      });
      fetch(
        `http://api.pondokprogrammer.com/api/video_pembelajaran/${
          this.state.videoID
        }`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer${token}`,
          },
          body: JSON.stringify({
            judul: this.state.valueVideoUpdate,
            url_video: this.state.url_videoUpdate,
            playlist_id: this.state.playlistID,
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
    console.log(paramID + '<= ini id nya');
    this.setState({modalVisible2: true, modalVisible3: false});
    fetch(`http://api.pondokprogrammer.com/api/video_pembelajaran/${paramID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${token}`,
      },
    })
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
      'Hapus Playlist Video',
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
        if (value.playlist_id == this.props.route.params.id) {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              delayPressIn={10}
              key={key}
              onPress={() =>
                this.fieldUpdate(
                  value.judul,
                  value.id,
                  value.url_video,
                  value.playlist_id,
                )
              }>
              <View style={styles.ListBox} key={key}>
                <Text style={styles.boxTitle}>{value.judul}</Text>
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
    const {videoID} = this.state;
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
            <View style={{...styles.modalContainer, height: '50%'}}>
              <TextInput
                multiline={true}
                placeholder="Tuliskan Judul Video"
                value={this.state.valueVideo}
                onChangeText={text => this.setState({valueVideo: text})}
                style={{...styles.textInput, marginBottom: 10}}
              />
              <TextInput
                multiline={true}
                placeholder="Tuliskan Url"
                value={this.state.url_video}
                onChangeText={text => this.setState({url_video: text})}
                style={styles.textInput}
              />
              <View style={styles.centeredModalButton}>
                <TouchableOpacity
                  onPress={() => this.buatVideo()}
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
            <View style={{...styles.modalContainer, height: '50%'}}>
              <TextInput
                multiline={true}
                placeholder="Tuliskan Playlist"
                value={this.state.valueVideoUpdate}
                onChangeText={text => this.setState({valueVideoUpdate: text})}
                style={{...styles.textInput, marginBottom: 10}}
              />
              <TextInput
                multiline={true}
                placeholder="Tuliskan Url"
                value={this.state.url_videoUpdate}
                onChangeText={text => this.setState({url_videoUpdate: text})}
                style={styles.textInput}
              />
              <View style={styles.centeredModalButton}>
                <TouchableOpacity
                  onPress={() => this.ubahVideo()}
                  style={{...styles.button2, backgroundColor: 'orange'}}
                  activeOpacity={0.5}
                  delayPressIn={10}>
                  <Text style={styles.textButton2}>Ubah</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.cautionDelete(videoID)}
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
        <Navbar name="Isi Playlist" />
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

export default connect(mapStateToProps)(BuatVideoCheck2);

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
