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
    justifyContent: 'center',
  },
  THeader: {
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
    right: 20,
    bottom: 20,
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
  preview: {
    flex: 1,
    top: 0,
    // justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  modal: {
    flex: 1,
  },
  ListBox: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowOffset: {width: 10, height: 10},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 3,
    backgroundColor: 'white',
  },
  imageKurikulum: {
    height: 150,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(0,184,150)',
  },
  titleImage: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  boxFrameworkTitle: {
    height: 50,
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  frameworkTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'grey',
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
  boxSpinner: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  iconRefresh: {
    marginTop: 30,
  },
  
});
