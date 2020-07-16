import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';
import AddButton from '../components/AddButton';
import Icon from 'react-native-vector-icons/FontAwesome';

class BuatMateriPembelajaran extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Navbar name="Buat Materi Pembelajaran" />
        <AddButton
          params={() =>
            this.props.navigation.navigate('BuatMateriPembelajaranCreate')
          }
        />
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}

export default BuatMateriPembelajaran;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
