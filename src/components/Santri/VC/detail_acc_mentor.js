import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';
import Loader from './loader';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';
import DropDownItem from 'react-native-drop-down-item';

const IC_ARR_DOWN = require('../../../assets/images/ic_arr_down.png');
const IC_ARR_UP = require('../../../assets/images/ic_arr_up.png');

const axios = require('axios');

class DetailVideoCheck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      status: true,
      animationLoad: false,
      isLoading: false,
      video: [],
      video_check: [],
      id_playlist: '',
      student: [],
    };
  }

  componentDidMount() {
    const {ID_Playlist} = this.props.route.params;
    this.setState({
      id_playlist: ID_Playlist,
    });

    setTimeout(() => {
      this.getData();
    }, 1000);
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    const {id_playlist} = this.state;
    // console.log(id_playlist)
    this.setState({refreshing: true, animationLoad: true});
    axios
      .get(
        `http://api.pondokprogrammer.com/api/video_playlist/${id_playlist}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const data = response.data.video;
        // const video_check = data
        console.log(data);

        this.setState({
          video: data,
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
                ? this.state.video.map((param, i) => {
                    const Learned = this.state.video[i].is_learned == 0 ? 0 : 1;
                    const Approved =
                      this.state.video[i].is_approved == 0 ? 0 : 1;
                    const status = () => {
                      if (Learned == 0) {
                        return null;
                      } else if (Learned == 1 && Approved == 0) {
                        return (
                          <View
                            style={[
                              styles.status,
                              styles.play,
                              {backgroundColor: 'red'},
                            ]}>
                            <Text style={styles.tPlay}>Pending</Text>
                          </View>
                        );
                      } else if (Learned == 1 && Approved == 1) {
                        return (
                          <View style={[styles.status, styles.play]}>
                            <Text style={styles.tPlay}>Diterima</Text>
                          </View>
                        );
                      }
                    };

                    const video_id = this.state.video[i].id;
                    console.log(video_id);
                    const is_learned = 1;
                    return (
                      <DropDownItem
                        key={i}
                        contentVisible={false}
                        invisibleImage={IC_ARR_DOWN}
                        visibleImage={IC_ARR_UP}
                        header={
                          <View style={{width: '80%'}}>
                            <Text style={styles.judul}>{param.judul}</Text>
                          </View>
                        }>
                        <View style={styles.url}>
                          <TouchableOpacity
                            onPress={() =>
                              Linking.openURL(`${param.url_video}`)
                            }
                            style={styles.play}>
                            <Text style={styles.tPlay}>Putar Video</Text>
                          </TouchableOpacity>
                          {Learned == 1 ? null : (
                            <TouchableOpacity
                              onPress={() =>
                                this.sendIs_learned({is_learned, video_id})
                              }
                              style={styles.play}>
                              <Text style={styles.tPlay}>Selesai</Text>
                            </TouchableOpacity>
                          )}
                          {status()}
                          {/* {Learned == 1 || Approved == 0
                            ? <View
                                style={[
                                  styles.status,
                                  styles.play,
                                  {backgroundColor: 'red'},
                                ]}
                              >
                                <Text>Pending</Text>
                              </View>
                            : <View style={[styles.status, styles.play]}>
                                <Text>Diterima</Text>
                              </View>} */}
                        </View>
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

  sendIs_learned = ({is_learned, video_id}) => {
    this.setState({isLoading: true});
    const Video_id = video_id;
    const ISlearned = is_learned;
    console.log(Video_id);

    const auth = this.props.authentication;
    const token = auth.token;
    axios
      .post(
        `http://api.pondokprogrammer.com/api/video_pembelajaran/add`,
        {
          video_id: `${Video_id}`,
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
        this.setState({isLoading: false});
      });

    setTimeout(() => {
      this.setState({isLoading: false});
    }, 3000);
    setTimeout(() => {
      this.getData();
    }, 3200);
  };

  render() {
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
  const {authentication, jurusan_id} = state.reducers;
  return {authentication, jurusan_id};
};

export default connect(mapStateToProps)(DetailVideoCheck);
