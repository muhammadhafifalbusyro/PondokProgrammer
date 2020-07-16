import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {AccordionList} from 'accordion-collapse-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ListProfilePondok} from '../data/ListProfilePondok';
import Navbar from '../components/Navbar';
import BackButton from '../components/BackButton';

class ProfilePondok extends React.Component {
  state = {
    list: ListProfilePondok,
  };

  _head(item) {
    return (
      <View style={styles.acordionHead}>
        <Text style={styles.acordionHeadText}>{item.title}</Text>
      </View>
    );
  }

  _body(item) {
    return (
      <View style={styles.acordionBodyContainer}>
        {item.body.map((value, key) => {
          return (
            <View key={key} style={styles.acordionBody}>
              <Text style={styles.acordionBodyText}>{value.subjudul}</Text>
              <Text>{value.isi}</Text>
            </View>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Navbar name="Profile Pondok" />
        <AccordionList
          list={this.state.list}
          header={this._head}
          body={this._body}
          keyExtractor={(item) => `${item.id}`}
        />
        <BackButton params={() => this.props.navigation.goBack()} />
      </View>
    );
  }
}
export default ProfilePondok;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  acordionHead: {
    alignItems: 'center',
    height: 50,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgb(0, 184, 150)',
    borderBottomWidth: 1,
    borderColor: 'white',
  },
  acordionHeadText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
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
});
