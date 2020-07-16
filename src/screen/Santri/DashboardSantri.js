import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ScrollView} from 'react-native-gesture-handler';
import {boxIcon} from './images';
import {styles} from './styles';

class DashboardMentor extends React.Component {
  state = {
    boxIcon: boxIcon,
  };

  changeScreen = (key) => {
    switch (key) {
      case 0:
        alert(key);
        // this.props.navigation.navigate('DashboardMentor')
        break;
      case 1:
        alert(key);
        break;
      case 2:
        alert(key);
        break;
      case 3:
        alert(key);
        break;
      case 4:
        alert(key);
        break;
      case 5:
        alert(key);
        break;
      case 6:
        alert(key);
        break;
      case 7:
        alert(key);
        break;
      case 8:
        alert(key);
        break;
      case 9:
        alert(key);
        break;
      case 10:
        alert(key);
        break;
      case 11:
        alert(key);
        break;
      case 12:
        alert(key);
        break;
      case 13:
        alert(key);
        break;
      case 14:
        alert(key);
        break;
      default:
        alert('lainnya');
    }
  };

  render() {
    const {boxIcon} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.dashboardTemplate}>
          <Image
            source={require('../../assets/images/banner.png')}
            style={styles.banner}
          />
          <ScrollView>
            <View style={styles.iconTemplates}>
              <View style={styles.dashboardTitleBox}>
                <Text style={styles.dashboardTitle}>DASHBOARD SANTRI</Text>
              </View>
              {boxIcon.map((value, key) => {
                return (
                  <View key={key} style={styles.iconField}>
                    <TouchableOpacity
                      onPress={() => this.changeScreen(key)}
                      delayPressIn={10}
                      activeOpacity={0.5}>
                      <View
                        style={{
                          ...styles.boxIcon,
                          borderColor: `${value.color}`,
                        }}>
                        <Icon
                          name={value.iconName}
                          size={value.size}
                          color={value.color}
                        />
                      </View>
                    </TouchableOpacity>
                    <Text style={styles.textIcon}>{value.title}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default DashboardMentor;
