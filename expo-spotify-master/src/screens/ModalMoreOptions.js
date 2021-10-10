import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image
} from 'react-native';
import { device, gStyle, images, colors, fonts } from '../constants';

// components
import LineItemCategory from '../components/LineItemCategory';

// mock data

const ModalMoreOptions = ({ navigation, screenProps: { setToggleTabBar } }) => {
  const album = navigation.getParam('album');

  return (
    <React.Fragment>
      
    </React.Fragment>
  );
};

ModalMoreOptions.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  containerSafeArea: {
    ...gStyle.containerAbsolute,
    backgroundColor: colors.blackBlur
  },
  containerButton: {
    ...gStyle.flexCenter,
    ...gStyle.spacer6
  },
  buttonText: {
    color: colors.white,
    fontSize: 18
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  container: {
    alignItems: 'center',
    paddingTop: device.iPhoneNotch ? 94 : 50
  },
  containerImage: {
    shadowColor: colors.black,
    shadowOffset: { height: 8, width: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6
  },
  image: {
    height: 148,
    marginBottom: 16,
    width: 148
  },
  title: {
    color: colors.white,
    fontFamily: fonts.spotifyBold,
    fontSize: 20,
    marginBottom: 8,
    paddingHorizontal: 24,
    textAlign: 'center'
  },
  albumInfo: {
    color: colors.greyInactive,
    fontFamily: fonts.spotifyRegular,
    fontSize: 12,
    marginBottom: 48
  }
});

export default ModalMoreOptions;
