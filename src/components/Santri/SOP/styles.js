import {StyleSheet,Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    container : {
        flex : 1
    },
    header : {
        height : 50,
        backgroundColor : "rgb(0, 184, 150)",
        justifyContent : 'center',
    },
    sop : {
        fontSize : 20,
        color : '#fff',
        fontWeight : 'bold',
        marginLeft : 10
    },
    mainSOP : {
        flex: 1,
        margin : 10
    },
    subSop : {
        flexDirection : 'row',
        paddingBottom : 5,
        borderBottomWidth : 2
    },
    t_sop : {
        marginLeft : 5
    },
    TouchableOpacityStyle: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 30,
      },
      backgroundOffline: {
        height: windowHeight - 50,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      },
      imageOffline: {
        height: 100,
        width: 100,
      },
      nodata : {
          flex : 1,
          alignItems : 'center',
      },
      Tnodata : {
          fontSize : 20,
          fontWeight : 'bold'
      }
})