import { 
    StyleSheet
} from 'react-native'

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
        justifyContent : 'center',
        paddingBottom : 5,
        borderBottomWidth : 2
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
})