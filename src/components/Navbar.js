import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Navbar = ({name}) => {
  return (
    <View style={styles.nav}>
      <Text style={styles.navText}>{name}</Text>
    </View>
  );
};
export default Navbar;

const styles = StyleSheet.create({
  nav: {
    height: 50,
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 5,
  },
  navText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
