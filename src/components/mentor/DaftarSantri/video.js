// import React, {Component} from 'react';
// import {
//   View,
//   Text,
//   StatusBar,
//   TouchableOpacity,
//   ScrollView,
//   RefreshControl,
//   ToastAndroid,
//   Linking
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import {styles} from '../../Santri/VC/styles';
// import Loader from '../../Santri/VC/loader';
// import {connect} from 'react-redux';
// import Spinner from 'react-native-spinkit';
// import DropDownItem from 'react-native-drop-down-item';

// const IC_ARR_DOWN = require('../../../assets/images/ic_arr_down.png');
// const IC_ARR_UP = require('../../../assets/images/ic_arr_up.png');

// const axios = require('axios');

// class DetailVideoCheck extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       refreshing: false,
//       status: true,
//       animationLoad: false,
//       isLoading: false,
//       video: [],
//       video_check: [],
//       id_santri: '',
//       student: [],
//       data : []
//     };
//   }

//   // componentDidMount() {
//   //   const {id_santri} = this.props.route.params;
//   //   this.setState({
//   //     id_santri: id_santri,
//   //   });

//   //   setTimeout(() => {
//   //     this.getData();
//   //   }, 1000);
//   // }

//   getData = () => {
//     const data = this.props.authentication;
//     const token = data.token;
//     const {id_santri} = this.state;
//     // console.log(id_santri)
//     this.setState({refreshing: true, animationLoad: true});
//     axios
//       .get(
//         `https://api.pondokprogrammer.com/api/mentor/student/${id_santri}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       )
//       .then(response => {
//         const data = response.data.video
//         // const video_check = data
//         // console.log(data[0].video_check);
//         console.log(data)
//         this.setState({
//           data : response.data,
//           video: data,
//           refreshing: false,
//           status: true,
//           animationLoad: false,
//         });
//       })
//       .catch(error => {
//         // console.log(error);
//         ToastAndroid.show(
//           'Data gagal didapatkan',
//           ToastAndroid.SHORT,
//           ToastAndroid.CENTER,
//         );
//         this.setState({
//           refreshing: false,
//           status: false,
//           animationLoad: false,
//         });
//       });
//   };

//   onRefreshScreen = () => {
//     this.getData();
//   };

//   renderListScreen = () => {
//     const Video = this.state.video
//     const lengthData = Video.length;
//     if (lengthData === 0) {
//       return (
//         <View style={styles.nodata}>
//           <Text style={styles.Tnodata}>Tidak Ada Data</Text>
//         </View>
//       );
//     } else if (this.state.status) {
//       return (
//         <View style={styles.mainDetail}>
//           <View style={styles.viewLabel}>
//             <View style={{flex: 1}}>
//               {this.state.video
//                 ? this.state.video.map((param, i) => {
//                     <Text>{param.id}</Text>
//                   })
//                 : null}
//               <View style={{height: 10}} />
//             </View>
//           </View>
//           {/* </TouchableOpacity> */}
//         </View>
//       );
//       // });
//     } else {
//       return (
//         <View style={styles.backgroundOffline}>
//           <View
//             style={{
//               height: 40,
//               width: '100%',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}>
//             <Spinner
//               type="Bounce"
//               color="rgb(0,184,150)"
//               isVisible={this.state.animationLoad}
//             />
//           </View>
//           {/* <Image
//             source={require ('../../../assets/images/tidakadainternet.png')}
//             style={styles.imageOffline}
//           /> */}
//           <Text>Tidak Ada Internet</Text>
//           <TouchableOpacity
//             activeOpacity={0.5}
//             delayPressIn={10}
//             onPress={() => this.getData()}>
//             <Icon
//               name="refresh"
//               color="rgb(0,184,150)"
//               size={40}
//               style={{marginTop: 30}}
//             />
//           </TouchableOpacity>
//         </View>
//       );
//     }
//   };

//   sendIs_learned = ({is_learned, video_id}) => {
//     this.setState({isLoading: true});
//     const Video_id = video_id;
//     const ISlearned = is_learned;
//     // console.log(ISlearned, Video_id + "testt");

//     const auth = this.props.authentication;
//     const token = auth.token;
//     axios
//       .post(
//         `https://api.pondokprogrammer.com/api/video_pembelajaran/add`,
//         {
//           video_id: `${Video_id}`,
//           is_learned: ISlearned,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       )
//       .then(response => console.log(response.data))
//       .catch(error => {
//         console.log(error);
//         this.setState({isLoading: false});
//       });

//     setTimeout(() => {
//       this.setState({isLoading: false});
//     }, 3000);
//     setTimeout(() => {
//       this.getData();
//     }, 3200);
//   };

//   render() {
//     const {Playlist} = this.props.route.params;
//     const data = this.state.video[0]

//     const {id} = data
//     console.log(this.state.video[0])

//     return (
//       <View style={styles.container}>
//         <StatusBar backgroundColor="rgb(0, 184, 150)" />
//         <View style={styles.header}>
//           <Text style={styles.pmd}>{Playlist}</Text>
//         </View>
//         <View style={styles.mainDetail}>
//           <Loader loading={this.state.isLoading} />
//           <ScrollView
//             style={{flex: 1}}
//             refreshControl={
//               <RefreshControl
//                 colors={['rgb(0,184,150)']}
//                 refreshing={this.state.refreshing}
//                 onRefresh={() => this.onRefreshScreen()}
//               />
//             }>
//             <Text>Cooming Soon</Text>

//             {/* {this.renderListScreen()} */}
//           </ScrollView>
//         </View>
//         <TouchableOpacity
//           style={styles.TouchableOpacityStyle}
//           onPress={() => this.props.navigation.goBack()}>
//           <Icon name="arrow-left" size={40} color="rgb(0, 184, 150)" />
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const mapStateToProps = state => {
//   const {authentication, jurusan_id} = state.reducers;
//   return {authentication, jurusan_id};
// };

// export default connect(mapStateToProps)(DetailVideoCheck);

// //import liraries
// import React, { Component } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// // create a component
// class MyClass extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Cooming Soon</Text>
//       </View>
//     );
//   }
// }
// // define your styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// //make this component available to the app
// export default MyClass;

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
} from 'react-native';

import Spinner from 'react-native-spinkit';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import Navbar from '../../Navbar';
import BackButton from '../../BackButton';
import AddButton from '../../AddButton';

const axios = require('axios');
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class VideoPilihSantri extends React.Component {
  state = {
    data: [],
    refreshing: false,
    status: true,
    animationLoad: false,
    id_santri: this.props.route.params.id_santri,
  };
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const data = this.props.authentication;
    const token = data.token;
    this.setState({refreshing: true, animationLoad: true});

    axios
      .get(
        `https://api.pondokprogrammer.com/api/video_pembelajaran/student/${
          this.state.id_santri
        }`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const data = response.data;
        if (data.status == 'success' || null) {
          this.setState({
            data: data.data,
            refreshing: false,
            status: true,
            animationLoad: false,
          });
        } else {
          this.setState({
            refreshing: false,
            status: true,
            animationLoad: false,
          });
        }
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

  previewKurikulum = value => {
    this.props.navigation.navigate('BuatTugasHarian2', {
      id: value.id,
      img: value.img,
      division: value.division,
      framework: value.framework,
      description: value.description,
      sprint: value.sprint.length,
      division_id: value.division_id,
    });
  };

  approved = value => {
    const data = this.props.authentication;
    const token = data.token;
    this.setState({refreshing: true, animationLoad: true});

    axios
      .put(
        `https://api.pondokprogrammer.com/api/video_pembelajaran/student/${
          value.id
        }`,
        {
          is_approved: '1',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const data = response.data;
        console.log(data);
        if (data.status == 'success' || null) {
          console.log(data);
          this.setState({
            refreshing: false,
            status: true,
            animationLoad: false,
          });
          this.getData();
          ToastAndroid.show(
            'Telah diverifikasi',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          this.setState({
            refreshing: false,
            status: true,
            animationLoad: false,
          });
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Netwok error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setState({refreshing: false, status: false, animationLoad: false});
      });
  };

  cancelled = value => {
    const data = this.props.authentication;
    const token = data.token;
    this.setState({refreshing: true, animationLoad: true});

    axios
      .put(
        `https://api.pondokprogrammer.com/api/video_pembelajaran/student/${
          value.id
        }`,
        {
          is_approved: '0',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        const data = response.data;
        if (data.status == 'success' || null) {
          this.setState({
            refreshing: false,
            status: true,
            animationLoad: false,
          });
          this.getData();
          ToastAndroid.show(
            'Berhasil dibatalkan',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          this.setState({
            refreshing: false,
            status: true,
            animationLoad: false,
          });
        }
      })
      .catch(error => {
        console.log(error);
        ToastAndroid.show(
          'Netwok error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        this.setState({refreshing: false, status: false, animationLoad: false});
      });
  };
  renderListScreen = () => {
    if (this.state.status) {
      return this.state.data.map((value, key) => {
        if (value.is_approved == '0') {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              delayPressIn={10}
              key={key}
              onPress={() => this.approved(value)}>
              <View
                style={{
                  ...styles.ListBox,
                  height: 100,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'red',
                }}>
                <Text>{value.judul}</Text>
              </View>
            </TouchableOpacity>
          );
        } else if (value.is_approved == '1') {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              delayPressIn={10}
              key={key}
              onPress={() => this.cancelled(value)}>
              <View
                style={{
                  ...styles.ListBox,
                  height: 100,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'lime',
                }}>
                <Text>{value.judul}</Text>
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
            source={require('../../../assets/images/noconnectionlogo.png')}
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
      <View style={styles.container}>
        <Navbar name="Playlist Video Check" />
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
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect(mapStateToProps)(VideoPilihSantri);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ListBox: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
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
});
