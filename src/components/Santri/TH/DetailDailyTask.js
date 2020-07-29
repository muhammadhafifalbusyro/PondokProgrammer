import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
  ScrollView,
  RefreshControl,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import Loader from '../PMD/loader';
import DropDownItem from 'react-native-drop-down-item';
import Modal from 'react-native-modal';

const IC_ARR_DOWN = require('../../../assets/images/ic_arr_down.png');
const IC_ARR_UP = require('../../../assets/images/ic_arr_up.png');

const axios = require('axios');

class DetailDailyTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: [],
      id_topik: '',
      refreshing: false,
      status: true,
      animationLoad: false,
      isLoading: false,
      isModalVisible: false,
      isModalStatus: false,
      link_github: '',
      Rstatus: [],
      filter: [],
    };
    this.arrayholder = [];
  }

  componentDidMount() {
    this.getData();
    this.getStatus();
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  toggleModalStatus = dailyTask_id => {
    this.setState({isModalStatus: !this.state.isModalStatus});
    this.filter(dailyTask_id);
    setTimeout(() => {
      this.filter();
    }, 60000);
  };

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    const jurusan_id = this.props.jurusan_id.jurusan_id;
    const {Sprint, id_topik} = this.props.route.params;

    this.setState({refreshing: true, animationLoad: true});
    axios
      .get(
        `https://api.pondokprogrammer.com/api/curriculum/${jurusan_id}/${Sprint}/${id_topik}/daily_task`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const data = response.data;
        console.log(data);
        this.setState({
          task: data,
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
    const {task} = this.state;
    const lengthData = task.length;
    if (lengthData === 0) {
      return (
        <View style={styles.nodata}>
          <Text style={styles.Tnodata}>Tidak Ada Data</Text>
        </View>
      );
    } else if (this.state.status) {
      return this.state.task.map((value, key) => {
        const dailyTask_id = value.id;
        const is_learned = 1;
        return (
          <View style={styles.mainDetail} key={key}>
            <DropDownItem
              key={key}
              contentVisible={false}
              invisibleImage={IC_ARR_DOWN}
              visibleImage={IC_ARR_UP}
              header={
                <View style={{width: '80%'}}>
                  <Text style={styles.judul}>
                    {value.task.length <= 50 ? (
                      <Text>{value.task}</Text>
                    ) : (
                      <Text> {value.task.slice(0, 50)}...</Text>
                    )}
                  </Text>
                </View>
              }>
              <Text style={{fontSize: 14}}>{value.task}</Text>
              <View style={styles.url}>
                <TouchableOpacity
                  onPress={() => this.toggleModal()}
                  style={styles.play}>
                  <Text style={[styles.tPlay, {fontSize: 16}]}>
                    Kirim Jawaban
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.toggleModalStatus(dailyTask_id)}
                  style={styles.play}>
                  <Text style={styles.tPlay}>Status</Text>
                </TouchableOpacity>
              </View>
            </DropDownItem>
            <Modal
              isVisible={this.state.isModalVisible}
              style={{
                backgroundColor: '#fff',
                borderRadius: 20,
              }}>
              <View style={{margin: 50}}>
                <Text
                  style={{textAlign: 'left', fontSize: 20, fontWeight: 'bold'}}>
                  Link Github
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    borderBottomWidth: 2,
                  }}>
                  <TextInput
                    placeholder="Masuk Link Repository Github"
                    onChangeText={link_github =>
                      this.setState({link_github: link_github})
                    }
                  />
                </View>
                <View style={{alignItems: 'flex-end', margin: 10}}>
                  <View
                    style={{
                      width: 50,
                      height: 30,
                      backgroundColor: 'rgb(0, 184, 150)',
                      justifyContent: 'center',
                      borderRadius: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        this.kirimjawaban({dailyTask_id, is_learned})
                      }>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 15,
                          fontWeight: 'bold',
                          textAlign: 'center',
                        }}>
                        Kirim
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                style={styles.TouchableOpacityStyle}
                onPress={() => this.toggleModal()}>
                <Icon
                  name="chevron-circle-left"
                  size={40}
                  color="rgb(0, 184, 150)"
                />
              </TouchableOpacity>
            </Modal>
            <Modal isVisible={this.state.isModalStatus} transparent={true}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: 300,
                    width: 300,
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}>
                  {this.renderListStatus()}
                  <TouchableOpacity
                    style={styles.TouchableOpacityStyle}
                    onPress={() => this.toggleModalStatus()}>
                    <Icon
                      name="chevron-circle-left"
                      size={40}
                      color="rgb(0, 184, 150)"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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

  sendIs_learned = ({is_learned, stdKompetensi_id}) => {
    this.setState({isLoading: true});
    const STDKompetensi_id = stdKompetensi_id;
    const ISlearned = is_learned;

    const auth = this.props.authentication;
    const token = auth.token;
    axios
      .post(
        `https://api.pondokprogrammer.com/api/standar_kompetensi/add`,
        {
          stdKompetensi_id: STDKompetensi_id,
          is_learned: ISlearned,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => console.log(response.data))
      .catch(error => {
        console.log(error);
      });

    setTimeout(() => {
      this.setState({isLoading: false});
    }, 3000);
    setTimeout(() => {
      this.getData();
    }, 3200);
  };

  kirimjawaban = ({dailyTask_id, is_learned}) => {
    this.setState({isLoading: true});
    const {link_github} = this.state;
    const data = this.props.authentication;
    const token = data.token;
    axios
      .post(
        `https://api.pondokprogrammer.com/api/daily_task/add`,
        {
          dailyTask_id: dailyTask_id,
          link_github: link_github,
          is_learned: is_learned,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => console.log(response.data))
      .catch(error => {
        console.log(error);
      });

    setTimeout(() => {
      this.setState({isLoading: false});
      this.toggleModal();
    }, 3000);
    setTimeout(() => {
      this.getData();
    }, 3200);
  };

  getStatus = () => {
    const data = this.props.authentication;
    const token = data.token;
    axios
      .get(`https://api.pondokprogrammer.com/api/daily_task/student`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        const data = response.data;
        // console.log (data);
        this.setState({
          Rstatus: data,
        });
        this.arrayholder = data;
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Data gagal didapatkan',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      });
  };

  filter = dailyTask_id => {
    const newData = this.arrayholder.filter(item => {
      const itemData = item.dailyTask_id;
      const textData = dailyTask_id;

      return itemData.indexOf(textData) > -1;
    });
    this.setState({filter: newData});
  };

  renderListStatus = () => {
    const {filter} = this.state;
    const lengthData = filter.length;
    console.log(lengthData);
    if (lengthData === 0) {
      return (
        <View
          style={[
            styles.nodata,
            {justifyContent: 'center', backgroundColor: 'rgb(0,184,150)'},
          ]}>
          <Text
            style={
              (styles.Tnodata,
              {
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
              })
            }>
            Anda Belum Kirim Jawaban
          </Text>
        </View>
      );
    } else {
      return this.state.filter.map((value, key) => {
        return (
          <View
            style={{felx: 1, alignItems: 'center', justifyContent: 'center'}}
            key={key}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Status Jawaban Anda :
            </Text>
            {value.is_approved == 0 ? (
              <View
                style={{
                  height: 40,
                  width: 70,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Pending
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: 40,
                  width: 70,
                  backgroundColor: 'rgb(0,184,150)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                  Diterima
                </Text>
              </View>
            )}
          </View>
        );
      });
    }
  };

  render() {
    const {Sprint} = this.props.route.params;
    console.log(this.state.filter);
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View style={styles.header}>
          <Text style={styles.pmd}> Tugas {Sprint} </Text>
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

export default connect(mapStateToProps)(DetailDailyTask);
