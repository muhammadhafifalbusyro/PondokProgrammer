import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get ('window').width;
const windowHeight = Dimensions.get ('window').height;

export const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: 'rgb(0, 184, 150)',
    justifyContent: 'space-around',
    alignItems : 'center',
    flexDirection : 'row'
  },
  pmd: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  mainPMD: {
    flex: 1,
    margin: 15,
  },
  subPMD: {
    justifyContent: 'center',
    paddingBottom: 5,
    borderBottomWidth: 3,
    borderBottomColor: '#348FD4',
    marginTop: 15,
  },
  Tlist: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft : 20
  },
  flexbox: {
    flexDirection: 'row',
  },
  widthBox: {
    width: '90%',
  },
  iconBox: {
    justifyContent: 'center',
    alignItems: 'center',
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
  mainDetail: {
    flex: 1,
  },
  flexCheckbox: {
    flexDirection: 'row',
    alignItems : 'center',
    justifyContent : 'center'
  },
  label: {
    margin: 8,
  },
  viewLabel : {
    flex: 1,
  },
  mainSubmit: {
    alignItems: 'center',
    marginTop: 20,
  },
  submit: {
    backgroundColor: 'rgb(0, 184, 150)',
    height: 40,
    width: '60%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  Tsubmit: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 25,
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
  nodata: {
    flex: 1,
    alignItems: 'center',
  },
  Tnodata: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listTopik: {
    //   height : 40,
      width : '80%',
      margin : 10,
      backgroundColor : '#aeae',
      justifyContent : 'center',
      borderRadius : 20,
      paddingBottom : 10,
      paddingTop : 10
  },
});
