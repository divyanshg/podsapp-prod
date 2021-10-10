import * as React from 'react';
import { FlatList, StyleSheet, View, TouchableHighlight, TouchableOpacity, Text } from 'react-native';
import { colors, device, gStyle } from '../constants';

import ScreenHeader from '../components/ScreenHeader';
import { AuthContext } from '../contexts/AuthContext';
// import PaymentsButton from '../components/Payments';

const Library = () => {
  const {logOut} = React.useContext(AuthContext)
  return(
    <View style={gStyle.container}>
      <View style={styles.containerHeader}>
        <ScreenHeader title="Your Library" />
        <TouchableOpacity onPress={() => {logOut()}}>
          <Text style={{color: colors.white}}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 400}}>
        {/* <PaymentsButton /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerHeader: {
    position: 'absolute',
    top: 40,
    width: '100%',
    zIndex: 10
  },
});

export default Library;
