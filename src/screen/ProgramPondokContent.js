import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

class ProgramPondokContent extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Navbar name="Detail Program" />
        <ScrollView style={styles.container}>
          <Image
            source={{
              uri: this.props.route.params.uri,
            }}
            style={styles.imageContent}
          />
          <View style={styles.boxContent}>
            <Text style={styles.title}>{this.props.route.params.title}</Text>
            <Text>{this.props.route.params.content}</Text>
          </View>
        </ScrollView>
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
export default ProgramPondokContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContent: {
    flex: 1,
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  boxContent: {
    flex: 1,
    marginTop: 10,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
