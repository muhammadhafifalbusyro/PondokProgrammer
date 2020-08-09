import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from './styles';

class IDCard extends Component {
  constructor (props) {
    super (props);
    this.state = {};
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.THeader}> ID CARD </Text>
        </View>
        <View style={styles.profile}>
          <View style={styles.subProfile}>
            <Image
              style={styles.img}
              source={{
                uri: 'http://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png',
              }}
            />
            <Text>Wandi Pratama</Text>
            <Text>Mobile Division</Text>
          </View>
        </View>
        <View style={styles.status}>
          <View style={styles.tStatus}>
            <Text>Status</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default IDCard;
