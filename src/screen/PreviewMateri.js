import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Modal,
  Alert,
} from 'react-native';
import Navbar from '../components/Navbar';
import Spinner from 'react-native-spinkit';
import {connect} from 'react-redux';

class PreviewMateri extends React.Component {
  state = {
    topik_id: this.props.route.params.materi.id,
    judul: this.props.route.params.materi.judul,
    linkVideo: this.props.route.params.materi.video[0].url,
    topik: this.props.route.params.materi.markdown,
    modalVisible: false,
  };

  updateData = (topik_id, judul, video, topik) => {
    if (judul != '' && video != '' && topik != '') {
      this.setState({modalVisible: true});
      console.log(topik_id, judul, video, topik);

      let data = this.props.authentication;
      let token = data.token;

      fetch(
        `http://api.pondokprogrammer.com/api/curriculum/updateTopik/${topik_id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            _method: 'PUT',
            title: judul,
            video: video,
            topik: topik,
          }),
        },
      )
        .then(response => response.json())
        .then(json => {
          if (json.status) {
            this.setState({modalVisible: false});
            console.log(json);
            ToastAndroid.show(
              'Materi berhasil diubah',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
            this.props.navigation.goBack();
          }
        })
        .catch(error => {
          this.setState({modalVisible: false});
          console.log(error);
          ToastAndroid.show(
            'Network error',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        });
    } else {
      ToastAndroid.show(
        'Tidak boleh ada data yang kosong',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
  };
  deleteData = () => {
    const data = this.props.authentication;
    const token = data.token;

    let id = this.props.route.params.materi.id;

    this.setState({modalVisible: true});
    fetch(`http://api.pondokprogrammer.com/api/curriculum/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.status) {
          this.setState({modalVisible: false});
          ToastAndroid.show(
            'Materi berhasil dihapus',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.goBack();
        }
      })
      .catch(er => {
        this.setState({modalVisible: false});
        ToastAndroid.show(
          'Network error',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
        console.log(er);
      });
  };
  cautionDelete = () => {
    Alert.alert(
      'Hapus Materi',
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
            this.deleteData();
          },
        },
      ],
      {cancelable: false},
    );
  };
  render() {
    const {topik_id, judul, linkVideo, topik} = this.state;
    return (
      <View style={styles.container}>
        <Navbar name="Lihat Materi Pembelajaran" />
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
          <View style={styles.centeredView}>
            <View style={styles.modalContainer}>
              <Spinner visible={true} type="Wave" color="rgb(0,184,150)" />
              <Text style={styles.textModal}>Loading</Text>
            </View>
          </View>
        </Modal>
        <ScrollView style={styles.scrollview}>
          <View style={styles.containerForm}>
            <TextInput
              placeholder="Judul Materi"
              value={this.state.judul}
              onChangeText={text => this.setState({judul: text})}
              style={styles.boxForm}
              multiline={true}
            />
          </View>
          <View style={styles.containerForm}>
            <TextInput
              placeholder="Link Video"
              value={this.state.linkVideo}
              onChangeText={text => this.setState({linkVideo: text})}
              style={styles.boxForm}
              multiline={true}
            />
          </View>
          <View style={{...styles.containerForm, height: 370}}>
            <TextInput
              placeholder="Tulis materi"
              value={this.state.topik}
              textAlignVertical="top"
              onChangeText={text => this.setState({topik: text})}
              style={{...styles.boxForm, height: 350}}
              multiline={true}
            />
          </View>
          <View style={styles.centeredModalButton}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.5}
              delayPressIn={10}
              onPress={() =>
                this.updateData(topik_id, judul, linkVideo, topik)
              }>
              <Text style={styles.textButton}>Ubah</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.cautionDelete()}
              style={{...styles.button, backgroundColor: 'red'}}
              activeOpacity={0.5}
              delayPressIn={10}>
              <Text style={styles.textButton}>hapus</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{...styles.button, backgroundColor: 'rgb(0,184,150)'}}
              activeOpacity={0.5}
              delayPressIn={10}>
              <Text style={styles.textButton}>Kembali</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {authentication} = state.reducers;
  return {authentication};
};

export default connect(mapStateToProps)(PreviewMateri);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollview: {
    flex: 1,
    backgroundColor: 'white',
  },
  button: {
    height: 40,
    width: '30%',
    fontSize: 16,
    borderRadius: 3,
    padding: 10,
    backgroundColor: 'orange',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: 'white',
    fontWeight: 'bold',
  },
  centeredModalButton: {
    height: 100,
    width: '100%',
    paddingHorizontal: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  picker: {
    height: 40,
    width: '100%',
    color: 'grey',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: 100,
    width: 100,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModal: {
    color: 'grey',
    marginTop: 5,
  },
  boxImagePreview: {
    height: 150,
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  imagePreview: {
    height: 130,
    width: '80%',
    resizeMode: 'contain',
  },
  containerButtonCamera: {
    height: 60,
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  boxButtonCamera: {
    height: 40,
    width: '80%',
    borderRadius: 5,
    backgroundColor: 'rgb(0,184,150)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm: {
    height: 60,
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  boxForm: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'rgb(0,184,150)',
    padding: 5,
    justifyContent: 'center',
  },
});
