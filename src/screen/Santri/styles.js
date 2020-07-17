import {StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    height: '30%',
    width: '100%',
  },
  dashboardTemplate: {
    flex: 1,
  },
  iconTemplates: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 15,
  },
  iconField: {
    height: 115,
    width: windowWidth / 4,
    alignItems: 'center',
  },
  boxIcon: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(0, 184, 150)',
  },
  textIcon: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 5,
  },
  dashboardTitleBox: {
    width: '100%',
    margin: 15,
  },
  dashboardTitle: {
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 14,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    height: 100,
    width: 100,
    borderRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textModal: {
    color: 'grey',
    marginTop: 5,
  },
});
