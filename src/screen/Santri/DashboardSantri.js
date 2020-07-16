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
        this.props.navigation.navigate('DompetSaya')
        break;
      case 1:
        this.props.navigation.navigate('Toko')
        break;
      case 2:
        this.props.navigation.navigate('IDCard')
        break;
      case 3:
        this.props.navigation.navigate('SOP')
        break;
        case 4:
        this.props.navigation.navigate('Kurikulum')
        break;
        case 5:
        this.props.navigation.navigate('MateriDasar')
        break;
        case 6:
        this.props.navigation.navigate('TugasHarian')
        break;
        case 7:
        this.props.navigation.navigate('MiniProject')
        break;
        case 8:
        this.props.navigation.navigate('VideoCheck')
        break;
        case 9:
        this.props.navigation.navigate('Portofolio')
        break;
        case 10:
        this.props.navigation.navigate('CatatanPelanggaran')
        break;
        case 11:
        this.props.navigation.navigate('Raport')
        break;
        case 12:
        this.props.navigation.navigate('ImpianSaya')
        break;
        case 13:
        alert('keluar')
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
