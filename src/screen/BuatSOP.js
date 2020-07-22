import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  RefreshControl,
  Dimensions,
  Image,
  Alert,
} from 'react-native';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import AddButton from '../components/AddButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class BuatSOP extends React.Component {
  state = {
    animationLoad: false,
    status: true,
    refreshing: false,
    modalVisible: false,
    modalVisible2: false,
    valueSOP: '',
    data: [],
  };
  componentDidMount() {
    this.getData();
  }
  getData = () => {
    let data = this.props.authentication;
    let token = data.token;
    this.setState({refreshing: true, animationLoad: true});
    fetch('http://api.pondokprogrammer.com/api/standar_operasional', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer${token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        this.setState({
          data: json,
          refreshing: false,
          status: true,
          animationLoad: false,
        });
      })
      .catch(er => {
        console.log(er);
        this.setState({refreshing: false, status: false, animationLoad: false});
        ToastAndroid.show(
          'Network error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };
  deleteData = paramID => {
    let data = this.props.authentication;
    let token = data.token;
    this.setState({modalVisible2: true});
    fetch(
      `http://api.pondokprogrammer.com/api/standar_operasional/${paramID}`,
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
  onRefreshScreen = () => {
    this.getData();
  };
  cautionDelete = value => {
    Alert.alert(
      'Hapus SOP',
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
        return (
          <View key={key} style={styles.containerList}>
            <View style={styles.fieldText}>
              <View style={styles.contentNumber}>
                <Text style={styles.textContentNumber}>{key + 1}</Text>
              </View>
              <View style={styles.textContentValue}>
                <Text>{value.std_operasional}</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.cautionDelete(value.id)}
              activeOpacity={0.5}
              delayPressIn={10}
              style={styles.trash}>
              <Icon name="trash" size={20} color="white" />
            </TouchableOpacity>
          </View>
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
  buatSOP = () => {
    let data = this.props.authentication;
    let token = data.token;

    if (this.state.valueSOP != '') {
      this.setState({modalVisible2: true, modalVisible: false, valueSOP: ''});
      fetch('http://api.pondokprogrammer.com/api/standar_operasional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer${token}`,
        },
        body: JSON.stringify({
          status: '2',
          std_operasional: this.state.valueSOP,
        }),
      })
        .then(res => res.json())
        .then(json => {
          if (json.status) {
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

  render() {
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
                placeholder="Tuliskan SOP"
                value={this.state.valueSOP}
                onChangeText={text => this.setState({valueSOP: text})}
                style={styles.textInput}
              />
              <View style={styles.centeredModalButton}>
                <TouchableOpacity
                  onPress={() => this.buatSOP()}
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
        <Navbar name="Buat SOP" />
        <ScrollView
          style={styles.scrollview}
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

export default connect(mapStateToProps)(BuatSOP);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  textButton: {
    fontSize: 16,
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
});
