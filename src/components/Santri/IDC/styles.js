import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get ('window').width;
const windowHeight = Dimensions.get ('window').height;

export const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    justifyContent: 'center',
  },
  THeader: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  profile: {
    backgroundColor: 'rgb(0, 184, 150)',
    flex : 0.5,
  },
  status: {
    flex : 2
  },
  img : {
      height : 100,
      width : 100,
      borderRadius : 50
  },
  subProfile : {
      flex : 0.2,
      alignItems : 'center',
      justifyContent : 'center',
      paddingTop : '30%'
  },
  tStatus : {
    paddingTop : '30%',
    marginLeft : 20
  }
});
