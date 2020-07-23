import React, {Component} from 'react';
import {View, Text} from 'react-native';
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
      </View>
    );
  }
}

export default IDCard;
