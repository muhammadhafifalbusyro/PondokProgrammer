import React from 'react';
import {
  View,
  Text,
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
import Navbar from '../../../components/Navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import BackButton from '../../../components/BackButton';

const axios = require ('axios');
const windowWidth = Dimensions.get ('window').width;
const windowHeight = Dimensions.get ('window').height;

class DetailMasukKelas extends React.Component {
  state = {
    refreshing: false,
    qrVisible: false,
    data: [],
    peserta: [],
    status: true,
    animationLoad: false,
  };
  componentDidMount () {
    this.getData ();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    const id = this.props.route.params.id;
    // console.log (id + 'id kelas');
    this.setState ({refreshing: true, animationLoad: true});
    axios
      .get(`https://api.pondokprogrammer.com/api/class/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then (response => {
        console.log (response.data);
        this.setState ({
          data: response.data,
          peserta: response.data.student,
          refreshing: false,
          status: true,
          animationLoad: false,
        });
      })
      .catch (error => {
        console.log (error);
        ToastAndroid.show (
          'Tidak Ada Data',
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
    if (this.state.status) {
      return (
        <ScrollView
          style={{flex: 1}}
          style={styles.scrollView}
          refreshControl={
            <RefreshControl
              colors={['rgb(0,184,150)']}
              refreshing={this.state.refreshing}
              onRefresh={() => this.onRefreshScreen ()}
            />
          }
        >
          <View style={styles.ListBox}>
            <View style={styles.imageKurikulum}>
              <Text style={styles.titleImage}>{this.state.data.materi} </Text>
            </View>
          </View>
          <View />
          <View>
            <View style={styles.boxPesertaNotif}>
              <Text style={styles.textPeserta}>Peserta</Text>
              <Text style={styles.textPeserta}>
                {this.state.peserta.length} orang
              </Text>
            </View>
            {this.state.peserta.map ((value, key) => {
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
          <Text>Tidak Ada Data</Text>
          <TouchableOpacity
            style={styles.iconRefresh}
            activeOpacity={0.5}
            delayPressIn={10}
            onPress={() => this.getData ()}
          >
            <Icon name="refresh"  color="rgb(0,184,150)"  size={30} />
          </TouchableOpacity>
        </View>
      );
    }
  };

  render () {
    return (
      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.qrVisible}
          onRequestClose={() => {
            this.setState ({qrVisible: false});
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => this.setState ({qrVisible: false})}
          >
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
        {this.renderListScreen ()}
        <BackButton params={() => this.props.navigation.goBack ()} />
      </View>
    );
  }
}
const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect (mapStateToProps) (DetailMasukKelas);

const styles = StyleSheet.create ({
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
