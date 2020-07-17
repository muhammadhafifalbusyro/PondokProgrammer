import {StyleSheet} from 'react-native';

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
    flex: 1,
    padding: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    marginTop: 15,
  },
  iconField: {
    height: 80,
    width: 80,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  boxIcon: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgb(0, 184, 150)',
    marginBottom: 3,
  },
  textIcon: {
    textAlign: 'center',
    fontSize: 12,
  },
  dashboardTitle: {
    margin: 5,
    fontWeight: 'bold',
    color: 'grey',
    fontSize: 14,
  },
  dashboardTitleBox: {
    width: '100%',
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
