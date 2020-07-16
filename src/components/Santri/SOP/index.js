import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';

class SOP extends Component {
  constructor (props) {
    super (props);
    this.state = {
      data: [],
    };
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View style={styles.header}>
          <Text style={styles.sop}> SOP </Text>
        </View>
        <View style={styles.mainSOP}>
          <View style={styles.subSop}>
            <Text>1. SOP</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.TouchableOpacityStyle}
          onPress={() => this.props.navigation.goBack ()}
        >
          <Icon name="arrow-left" size={40} color="rgb(0, 184, 150)" />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SOP;
