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
} from 'react-native';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import AddButton from '../components/AddButton';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-community/picker';
import {connect} from 'react-redux';
import Spinner from 'react-native-spinkit';

class BuatKelasCreate extends React.Component {
  state = {
    modalVisible: false,
    divisi: '0',
    framework: '0',
    materi: '',
    data: [],
  };

  componentDidMount() {
    this.getData();
  }
  getData = () => {
    let data = this.props.authentication;
    let token = data.token;

    fetch('https://api.pondokprogrammer.com/api/kurikulum', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(json => {
        console.log(json);
        this.setState({data: json});
      })
      .catch(er => {
        console.log(er);
      });
  };
  buatKelas = (division_id, framework_id, materi) => {
    if (division_id != '0' && framework_id != '0' && materi != '') {
      let data = this.props.authentication;
      let token = data.token;
      this.setState({modalVisible: true});
      fetch('https://api.pondokprogrammer.com/api/class', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          division_id: division_id,
          framework_id: framework_id,
          materi: materi,
        }),
      })
        .then(res => res.json())
        .then(json => {
          if (json.status) {
            this.setState({modalVisible: false});
            console.log(json.status);
            this.props.navigation.goBack();
            ToastAndroid.show(
              'Kelas berhasil dibuat',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
          }
        })
        .catch(er => {
          this.setState({modalVisible: true});
          ToastAndroid.show(
            'Network dibuat',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          console.log(er);
        });
    } else {
      ToastAndroid.show(
        'Data tidak boleh kosong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  mapElement = () => {
    let division_id = [];
    let division = [];
    this.state.data.map(value => {
      division_id.push(value.division_id);
      division.push(value.division);
    });

    let division_id_filter = division_id.reduce((result, element) => {
      return result.includes(element) ? result : [...result, element];
    }, []);

    let division_filter = division.reduce((result, element) => {
      return result.includes(element) ? result : [...result, element];
    }, []);

    return division_filter.map((value, key) => {
      return (
        <Picker.Item label={value} value={division_id_filter[key]} key={key} />
      );
    });
  };
  render() {
    const {divisi, framework, materi} = this.state;
    return (
      <View style={styles.container}>
        <Navbar name="Buat Kelas" />
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
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
              <Text style={styles.textModal2}>Loading</Text>
            </View>
          </View>
        </Modal>
        <View style={styles.centeredView}>
          <View style={styles.boxPicker}>
            <Picker
              selectedValue={this.state.divisi}
              style={styles.picker}
              mode="dropdown"
              prompt="Options"
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue != '0') {
                  this.setState({divisi: itemValue});
                }
              }}>
              <Picker.Item label="Pilih Divisi" value="0" color="grey" />
              {this.mapElement()}
            </Picker>
          </View>
          <View style={styles.boxPicker}>
            <Picker
              selectedValue={this.state.framework}
              style={styles.picker}
              mode="dropdown"
              prompt="Options"
              onValueChange={(itemValue, itemIndex) => {
                if (itemValue != '0') {
                  this.setState({framework: itemValue});
                }
              }}>
              <Picker.Item label="Pilih Framework" value="0" color="grey" />
              {this.state.data.map((value, key) => {
                return (
                  <Picker.Item
                    label={value.framework}
                    value={value.framework_id}
                    key={key}
                  />
                );
              })}
            </Picker>
          </View>
          <TextInput
            textAlignVertical="top"
            placeholder="Judul Materi"
            value={this.state.materi}
            onChangeText={text => this.setState({materi: text})}
            style={styles.boxJudulMateri}
            multiline={true}
          />
          <View style={styles.centeredModalButton}>
            <TouchableOpacity
              onPress={() => this.buatKelas(divisi, framework, materi)}
              style={styles.button}
              activeOpacity={0.5}
              delayPressIn={10}>
              <Text style={styles.textButton}>Buat</Text>
            </TouchableOpacity>
          </View>
        </View>
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect(mapStateToProps)(BuatKelasCreate);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '15%',
    backgroundColor: 'white',
  },
  modalContainer: {
    height: '50%',
    width: '90%',
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 50,
    width: '100%',
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
  boxPicker: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgb(0,184,150)',
    padding: 5,
    justifyContent: 'center',
    marginBottom: 20,
  },
  boxJudulMateri: {
    height: 80,
    width: '80%',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgb(0,184,150)',
    padding: 5,
    marginBottom: 20,
  },
});
