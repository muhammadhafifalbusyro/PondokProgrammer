import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';

class DetailTugasHarian extends Component {
  constructor (props) {
    super (props);
    this.state = {
      isSelected: false,
    };
  }

  render () {
    const { Sprint } = this.props.route.params
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View style={styles.header}>
          <Text style={styles.pmd}> {Sprint} </Text>
        </View>
        <View style={styles.mainDetail}>
          <View style={styles.flexCheckbox}>
            <Text style={styles.label}>Do you like React Native?</Text>

          </View>
          <View style={styles.flexCheckbox}>
            <Text style={styles.label}>Variabel da Operator</Text>

          </View>
          <View style={styles.mainSubmit}>
            <TouchableOpacity style={styles.submit}>
              <Text style={styles.Tsubmit}>Submit</Text>
            </TouchableOpacity>
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

export default DetailTugasHarian;
