import {StyleSheet, Dimensions} from 'react-native';
const windowWidth = Dimensions.get ('window').width;
const windowHeight = Dimensions.get ('window').height;

export const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
  header: {
    height: 50,
    // backgroundColor: 'rgb(0, 184, 150)',
    justifyContent: 'center',
  },
  THeader: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  
});
