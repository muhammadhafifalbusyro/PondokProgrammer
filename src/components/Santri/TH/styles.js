import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    backgroundColor: 'rgb(0, 184, 150)',
    justifyContent: 'center',
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
    marginTop : 15
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
    right: 30,
    bottom: 30,
  },
  mainDetail : {
      flex : 1
  },
  flexCheckbox : {
    flexDirection: "row",
  },
  label: {
    margin: 8,
  },
  mainSubmit : {
    alignItems : 'center',
    marginTop : 20
  },
  submit : {
      backgroundColor : "rgb(0, 184, 150)" ,
      height : 40,
      width : "60%",
      alignItems : 'center',
      justifyContent : 'center',
      borderRadius : 20
  },
  Tsubmit : {
      color : '#fff',
      fontWeight : 'bold',
      fontSize : 25
  },
  nodata: {
    flex: 1,
    alignItems: 'center',
  },
  Tnodata: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
