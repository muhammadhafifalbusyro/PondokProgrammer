import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import {styles} from './styles';
import {connect} from 'react-redux';
const axios = require ('axios');
import Icon from 'react-native-vector-icons/FontAwesome';
import Shimmer from './Shimmer';
import ImagePicker from 'react-native-image-picker';

// import ProgressCircle from 'react-native-progress-circle';
import {TextInput} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './loader';

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class IDCard extends Component {
  constructor (props) {
    super (props);
    this.state = {
      id: '',
      data: [],
      isVisible: false,
      modalVisible: false,
      modalVisiblephone: false,
      modalImage: false,
      Email: '',
      Phone: '',
      //image
      avatarSource: {
        uri: 'https://static.thenounproject.com/png/1560819-200.png',
      },
      fileName: '',
      fileSize: '',
      type: '',
      uri: '',
      isLoading: false,
    };
  }

  componentDidMount () {
    this.getDataDiri ();
  }

  UNSAFE_componentWillMount () {
    setTimeout (() => {
      this.setState ({
        isVisible: true,
      });
    }, 3000);
  }

  pickerImage = () => {
    ImagePicker.showImagePicker (options, response => {
      console.log ('Response = ', response);
      if (response.didCancel) {
        console.log ('User cancelled image picker');
      } else if (response.error) {
        console.log ('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log ('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const fileName = response.fileName;
        const type = response.type;
        const uri = response.uri;
        const fileSize = response.fileSize;

        this.setState ({
          avatarSource: source,
          fileName: fileName,
          type: type,
          uri: uri,
          fileSize: fileSize,
        });
        this.modalImage ();
      }
    });
  };

  updateImage = () => {
    this.setState({isLoading:true})
    const {id} = this.state;
    let data = this.props.authentication;
    let token = data.token;

    let image = {
      uri: this.state.uri,
      type: this.state.type,
      name: this.state.fileName,
    };

    const formData = new FormData ();

    formData.append ('image', image);

    if (this.state.fileSize >= 1500000) {
      this.modalImage ()
      ToastAndroid.show (
        'Foto terlalu besar, maksimal 1,5 MB',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      );
    } else {
      fetch (`https://api.pondokprogrammer.com/api/student_image/${id}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      })
        .then (response => response.json ())
        .then (res => {
          console.log (res);
          this.getDataDiri()
        this.modalImage ();
        this.setState({isLoading: false})
        })
        .catch(err => console.log(err))
    }
  };

  getDataDiri = () => {
    const data = this.props.authentication;
    const token = data.token;

    axios
      .get (`https://api.pondokprogrammer.com/api/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then (response => {
        const data = response.data;
        const id = data.id;
        console.log (id);
        if (data.status || null) {
          this.setState ({
            data: data,
            id: id,
          });
        } else {
          this.setState ({
            data: [],
          });
        }
      })
      .catch (error => {
        console.log (error);
        ToastAndroid.show (
          'Data gagal didapatkan',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
      });
  };

  email = ({username, email, phone, id}) => {
    const data = this.props.authentication;
    const token = data.token;
    const {Email} = this.state;
    const seleksi = Email.length == 0 ? email : Email;
    console.log (seleksi);
    const body = {
      username: username,
      email: seleksi,
      phone: phone,
    };

    axios
      .post (
        `https://api.pondokprogrammer.com/api/student_update/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then (json => {
        console.log (json.data);
        alert ('Sukses');
        setTimeout (() => {
          this.logout ();
        }, 200);
      })
      .then (err => console.log (err));
  };

  phone = ({username, email, phone, id}) => {
    const data = this.props.authentication;
    const token = data.token;
    const {Phone} = this.state;
    const seleksi = Phone.length == 0 ? phone : Phone;
    console.log (seleksi);
    const body = {
      username: username,
      email: email,
      phone: seleksi,
    };

    axios
      .post (
        `https://api.pondokprogrammer.com/api/student_update/${id}`,
        body,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then (json => {
        console.log (json.data);
        alert ('Sukses');
        this.getDataDiri ();
        this.modalPhone ();
      })
      .then (err => console.log (err));
  };

  logout = () => {
    let data = this.props.authentication;
    let token = data.token;
    let id = data.id;

    fetch ('https://api.pondokprogrammer.com/api/student_logout', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify ({
        id: id,
      }),
    })
      .then (response => response.json ())
      .then (json => {
        if (json.status == 'success') {
          console.log (json.status);
          AsyncStorage.removeItem ('data');
          this.props.navigation.replace ('Main');
        }
      })
      .catch (error => {
        console.log (error);
      });
  };

  modal = () => {
    this.setState ({modalVisible: !this.state.modalVisible});
  };

  modalPhone = () => {
    this.setState ({modalVisiblephone: !this.state.modalVisiblephone});
  };

  modalImage = () => {
    this.setState ({modalImage: !this.state.modalImage});
  };

  render () {
    const {
      id,
      division,
      email,
      framework,
      image,
      phone,
      status,
      username,
      attend_count,
      division_id,
      video_count,
      kompetensi_count,
    } = this.state.data;

    const kehadiran = attend_count / 60 * 100;
    const jumKehadiran = kehadiran.toFixed (0);
    const toNumberKehadiran = parseInt (jumKehadiran);

    var x = '';
    switch (division_id) {
      case '1':
        x = 102;
        break;
      case '2':
        x = 95;
        break;
      case '3':
        x = 98;
        break;
      default:
        x = null;
    }

    const ProgresBelajar1 = kompetensi_count / division_id * 100;
    const jumProgresBelajar = ProgresBelajar1.toFixed (0);
    const ProgresBelajar = parseInt (jumProgresBelajar);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.THeader}> ID CARD </Text>
        </View>
        <View style={styles.profile}>
          <Modal
            visible={this.state.modalVisible}
            animationType="slide"
            transparent={true}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
            >
              <View
                style={{
                  height: 150,
                  width: '90%',
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  justifyContent: 'center',
                }}
              >
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Masukan Email Anda
                  </Text>
                  <TextInput
                    placeholder="Masukan Email Anda"
                    defaultValue={email}
                    onChangeText={email => this.setState ({Email: email})}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  >
                    <View>
                      <TouchableOpacity onPress={() => this.modal ()}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          Batal
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.email ({
                            username: username,
                            email: email,
                            phone: phone,
                            id: id,
                          })}
                      >
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          Simpan
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            visible={this.state.modalVisiblephone}
            animationType="slide"
            transparent={true}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
            >
              <View
                style={{
                  height: 150,
                  width: '90%',
                  backgroundColor: '#fff',
                  borderRadius: 20,
                  justifyContent: 'center',
                }}
              >
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                    Masukan Number Phone Anda
                  </Text>
                  <TextInput
                    placeholder="Masukan Number Phone Anda"
                    defaultValue={phone}
                    onChangeText={phone => this.setState ({Phone: phone})}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginLeft: 20,
                      marginRight: 20,
                    }}
                  >
                    <View>
                      <TouchableOpacity onPress={() => this.modalPhone ()}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          Batal
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View>
                      <TouchableOpacity
                        onPress={() =>
                          this.phone ({
                            username: username,
                            email: email,
                            phone: phone,
                            id: id,
                          })}
                      >
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          Simpan
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <View style={styles.subProfile}>
            <Shimmer
              autoRun={true}
              style={styles.img}
              visible={this.state.isVisible}
            >
              <Image
                style={styles.img}
                source={{
                  uri: `https://api.pondokprogrammer.com/img/profile/${image}`,
                }}
              />
            </Shimmer>
            <Shimmer
              autoRun={true}
              style={{height: 20, marginBottom: 10}}
              visible={this.state.isVisible}
            >
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>{username}</Text>
            </Shimmer>
            <Shimmer
              autoRun={true}
              style={{height: 20, marginBottom: 10}}
              visible={this.state.isVisible}
            >
              <Text>{division}({framework})</Text>
            </Shimmer>
          </View>
        </View>

        <ScrollView>
          <View style={styles.status}>
            <TouchableOpacity
              onPress={() => this.pickerImage ()}
              style={[
                styles.img,
                {
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  marginLeft: 125,
                  borderRadius: 0,
                },
              ]}
            >
              {this.state.isVisible
                ? <Icon
                    name="camera"
                    size={20}
                    color="rgb(0, 184, 150)"
                    style={{marginRight: 10}}
                  />
                : null}
            </TouchableOpacity>

            <Modal
              visible={this.state.modalImage}
              animationType="slide"
              transparent={true}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  backgroundColor: 'transparent',
                  alignItems : 'center'
                }}
              >
                <View
                  style={{
                    flex: 1,
                    width: '90%',
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    justifyContent: 'center',
                  }}
                >
                  <View style={{flex : 1, alignItems: 'center',justifyContent:'center'}}>
                    <Image
                      source={this.state.avatarSource}
                      style={{height: '80%', width: '100%'}}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: 10,
                      justifyContent: 'space-around',
                      alignItems: 'stretch',
                    }}
                  >
                    <TouchableOpacity style={{backgroundColor: 'rgb(0,184,150)', height : 50, width : 80, borderRadius: 20, alignItems:'center', justifyContent:'center'}} onPress={() => this.modalImage ()}>
                      <Text style={{color: '#fff',fontSize: 17}}>Batal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor: 'rgb(0,184,150)', height : 50, width : 80, borderRadius: 20, alignItems:'center', justifyContent:'center'}} onPress={() => this.updateImage ()}>
                      <Text style={{color: '#fff',fontSize: 17}}>Simpan</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={[styles.tStatus, {marginTop: 30, marginBottom: 30}]}>
              <Shimmer
                style={{height: 30, width: '90%', marginBottom: 10}}
                autoRun={true}
                visible={this.state.isVisible}
              >
                <View style={{flexDirection: 'row', margin: 5, marginTop: 10}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 25,
                    }}
                  >
                    <Icon name="envelope-o" size={20} color="rgb(0,184,150)" />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '100',
                        color: '#C0C0C0',
                      }}
                    >
                      Email
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '90%'}}>
                        <Text style={{fontSize: 15}}>{email}</Text>
                      </View>
                      <View>
                        <TouchableOpacity onPress={() => this.modal ()}>
                          <Icon
                            name="pencil"
                            size={15}
                            color="rgb(0,184,150)"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Shimmer>
              <Loader loading={this.state.isLoading} />
              <Shimmer
                style={{height: 30, width: '90%', marginBottom: 10}}
                autoRun={true}
                visible={this.state.isVisible}
              >
                <View style={{flexDirection: 'row', margin: 5, marginTop: 10}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 25,
                    }}
                  >
                    <Icon name="phone" size={20} color="rgb(0,184,150)" />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '100',
                        color: '#C0C0C0',
                      }}
                    >
                      Phone
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: '90%'}}>
                        <Text style={{fontSize: 15}}>{phone}</Text>
                      </View>
                      <View>
                        <TouchableOpacity onPress={() => this.modalPhone ()}>
                          <Icon
                            name="pencil"
                            size={15}
                            color="rgb(0,184,150)"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </Shimmer>

              <Shimmer
                style={{height: 30, width: '90%', marginBottom: 10}}
                autoRun={true}
                visible={this.state.isVisible}
              >
                <View style={{flexDirection: 'row', margin: 5, marginTop: 10}}>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 25,
                    }}
                  >
                    <Icon
                      name="graduation-cap"
                      size={20}
                      color="rgb(0,184,150)"
                    />
                  </View>
                  <View style={{marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: '100',
                        color: '#C0C0C0',
                      }}
                    >
                      Status
                    </Text>
                    <Text style={{fontSize: 15}}>{status}</Text>
                  </View>
                </View>
              </Shimmer>

              <Shimmer
                style={{height: 80, width: '90%'}}
                autoRun={true}
                visible={this.state.isVisible}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 20,
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontSize: 20,
                        marginBottom: 5,
                        fontWeight: 'bold',
                      }}
                    >
                      Kehadiran
                    </Text>
                    {/* <ProgressCircle
                      percent={toNumberKehadiran}
                      radius={50}
                      borderWidth={8}
                      color="#3399FF"
                      shadowColor="#999"
                      bgColor="#fff"
                    >
                      <Text style={{fontSize: 18}}>{toNumberKehadiran}%</Text>
                    </ProgressCircle>
                  </View>
                  <View style={{marginRight: 20}}>
                    <Text
                      style={{
                        fontSize: 20,
                        marginBottom: 5,
                        fontWeight: 'bold',
                      }}
                    >
                      Progres Belajar
                    </Text>
                    <ProgressCircle
                      percent={ProgresBelajar}
                      radius={50}
                      borderWidth={8}
                      color="#3399FF"
                      shadowColor="#999"
                      bgColor="#fff"
                    >
                      <Text style={{fontSize: 18}}>{ProgresBelajar}%</Text>
                    </ProgressCircle> */}
                    <TouchableOpacity
                      style={styles.TouchableOpacityStyle}
                      onPress={() => this.props.navigation.goBack ()}
                    >
                      <Icon
                        name="arrow-left"
                        size={40}
                        color="rgb(0, 184, 150)"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </Shimmer>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication, jurusan_id} = state.reducers;
  return {authentication, jurusan_id};
};

export default connect (mapStateToProps) (IDCard);
