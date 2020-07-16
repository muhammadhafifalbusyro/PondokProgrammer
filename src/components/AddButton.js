import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AddButton = ({params}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.backButton}
      delayPressIn={10}
      onPress={params}>
      <Icon name="plus" size={35} color="white" />
    </TouchableOpacity>
  );
};
export default AddButton;

const styles = StyleSheet.create({
  backButton: {
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: 'rgb(0, 184, 150)',
    position: 'absolute',
    zIndex: 1,
    bottom: '20%',
    right: '10%',
    elevation: 2,
  },
});
