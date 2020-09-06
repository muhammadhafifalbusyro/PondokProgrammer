import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ToastAndroid,
  Linking,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import Loader from './loader';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import DropDownItem from 'react-native-drop-down-item';

const IC_ARR_DOWN = require ('../../../assets/images/ic_arr_down.png');
const IC_ARR_UP = require ('../../../assets/images/ic_arr_up.png');

const axios = require ('axios');

class DetailVideoCheck extends Component {
  constructor (props) {
    super (props);
    this.state = {
      refreshing: false,
      status: true,
      animationLoad: false,
      isLoading: false,
      video: [],
      video_check: [],
      id_playlist: '',
      student: [],
      data: [],
    };
  }

  componentDidMount () {
    const {ID_Playlist} = this.props.route.params;
    this.setState ({
      id_playlist: ID_Playlist,
    });

    setTimeout (() => {
      this.getData ();
    }, 1000);
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    const {id_playlist} = this.state;
    console.log (id_playlist);
    this.setState ({refreshing: true, animationLoad: true});
    axios
      .get (
        `https://api.pondokprogrammer.com/api/video_playlist/${id_playlist}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then (response => {
        const data = response.data.video;
        // const video_check = data
        // console.log(data[0].video_check);
        console.log (data);
        this.setState ({
          data: response.data,
          video: data,
          refreshing: false,
          status: true,
          animationLoad: false,
        });
      })
      .catch (error => {
        // console.log(error);
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

  konfirmasi = ({is_learned, video_id}) => {
    Alert.alert (
      'Konfirmasi',
      'Apa anda yakin sudah paham ?',
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
            this.sendIs_learned({is_learned, video_id});
          },
        },
      ],
      {cancelable: false}
    );
  };

  renderListScreen = () => {
    const Video = this.state.video;
    const lengthData = Video.length;
    if (lengthData === 0) {
      return (
        <View style={styles.nodata}>
          <Text style={styles.Tnodata}>Tidak Ada Data</Text>
        </View>
      );
    } else if (this.state.status) {
      return (
        <View style={styles.mainDetail}>
          <View style={styles.viewLabel}>
            <View style={{flex: 1}}>
              {this.state.video
                ? this.state.video.map ((param, i) => {
                      var Learned;
                      var Approved;
                    if(this.state.video[i].video_check.length == 0) {
                      Learned = 0,
                      Approved = 0
                    }else {
                      Learned = this.state.video[i].video_check[0].is_learned
                      Approved = this.state.video[i].video_check[0].is_approved
                    }
                    
                    const status = () => {
                      if (Learned == 0) {
                        return null;
                      } else if (Learned == 1 && Approved == 0) {
                        return (
                          <View
                            style={[
                              styles.status,
                              styles.play,
                              {backgroundColor: 'orange'},
                            ]}
                          >
                            <Text style={[styles.tPlay, {color: '#fff'}]}>
                              Pending
                            </Text>
                          </View>
                        );
                      } else if (Learned == 1 && Approved == 1) {
                        return (
                          <View style={[styles.status, styles.play]}>
                            <Text style={styles.tPlay}>Diterima</Text>
                          </View>
                        );
                      } else {
                        return null;
                      }
                    };

                    const video_id = this.state.video[i].id;
                    {
                      /* console.log(video_id); */
                    }
                    const is_learned = 1;
                    {
                      /* const Learned = this.state.data.video_check.length == 0 ? 0 : 1; */
                    }
                    return (
                      <DropDownItem
                        key={i}
                        contentVisible={false}
                        invisibleImage={IC_ARR_DOWN}
                        visibleImage={IC_ARR_UP}
                        header={
                          <View style={{width: '80%', margin : 10}}>
                            <Text style={styles.judul}>{param.judul}</Text>
                          </View>
                        }
                      >
                        <View style={styles.url}>
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL (`${param.url_video}`)}
                            style={styles.play}
                          >
                            <Text style={styles.tPlay}>Putar Video</Text>
                          </TouchableOpacity>
                          {Learned == 1 
                            ? null
                            : <TouchableOpacity
                                onPress={() =>
                                  this.konfirmasi ({is_learned, video_id})}
                                style={[styles.play, {backgroundColor: 'red'}]}
                              >
                                <Text style={styles.tPlay}>Selesai</Text>
                              </TouchableOpacity>}
                          {status ()}
                        </View>
                        {Learned == 0
                          ? <Text style={{fontSize: 10}}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                }}
                              >
                                Klik Selesai,
                              </Text>
                              {' '}
                              Jika Telah Menonton Video
                            </Text>
                          : null}
                        {Learned == 1 && Approved == 0
                          ? <Text style={{fontSize: 10}}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color : 'orange'
                                }}
                              >
                                Menunggu Verifikasi Mentor
                              </Text>
                            </Text>
                          : null}
                        {Learned == 1 && Approved == 1
                          ? <Text style={{fontSize: 10}}>
                              <Text
                                style={{
                                  fontWeight: 'bold',
                                  color: 'rgb(0,184,150)',
                                }}
                              >
                                Video Teriverifikasi
                              </Text>
                            </Text>
                          : null}
                      </DropDownItem>
                    );
                  })
                : null}
              <View style={{height: 10}} />
            </View>
          </View>
          {/* </TouchableOpacity> */}
        </View>
      );
      // });
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

  sendIs_learned = ({is_learned, video_id}) => {
    this.setState ({isLoading: true});
    const Video_id = video_id;
    const ISlearned = is_learned;
    // console.log(ISlearned, Video_id + "testt");

    const auth = this.props.authentication;
    const token = auth.token;
    axios
      .post (
        `https://api.pondokprogrammer.com/api/video_pembelajaran/add`,
        {
          video_id: `${Video_id}`,
          is_learned: ISlearned,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then (response => console.log (response.data))
      .catch (error => {
        console.log (error);
        this.setState ({isLoading: false});
      });

    setTimeout (() => {
      this.setState ({isLoading: false});
    }, 3000);
    setTimeout (() => {
      this.getData ();
    }, 3200);
  };

  render () {
    const {Playlist} = this.props.route.params;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View style={styles.header}>
          <Text style={styles.pmd}>{Playlist}</Text>
        </View>
        <View style={styles.mainDetail}>
          <Loader loading={this.state.isLoading} />
          <ScrollView
            style={{flex: 1}}
            refreshControl={
              <RefreshControl
                colors={['rgb(0,184,150)']}
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefreshScreen ()}
              />
            }
          >
            {this.renderListScreen ()}
          </ScrollView>
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

export default connect (mapStateToProps) (DetailVideoCheck);
