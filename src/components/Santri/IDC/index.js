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
        {/* <View style={styles.header}>
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
            <Text>Text</Text>
          </View>
        </View> */}
        <View style={styles.status}>
          <Text>Text</Text>
        </View>
      </View>
    );
  }
}

export default IDCard;
