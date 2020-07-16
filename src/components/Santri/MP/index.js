import React, {Component} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';

class MiniProject extends Component {
  constructor (props) {
    super (props);
    this.state = {
    };
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="rgb(0, 184, 150)" />
        <View style={styles.header}>
        <Text style={styles.pmd}>Mini Project</Text>
        </View>
        <View style={styles.mainPMD}>
           <TouchableOpacity
             onPress={() => this.props.navigation.navigate ('DetailMiniProject')}
             style={styles.subPMD}
           >
             <View style={styles.flexbox}>
               <View style={styles.widthBox}>
                 <Text style={styles.Tlist}>Chat App </Text>
               </View>
               <View style={styles.iconBox}>
                 <Icon name="arrow-right" size={20} color="rgb(0, 184, 150)" />
               </View>
             </View>
           </TouchableOpacity>
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

export default MiniProject;
