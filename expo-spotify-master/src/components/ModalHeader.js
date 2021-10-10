import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { colors, device, gStyle } from '../constants';

// components
import TouchIcon from './TouchIcon';

const ModalHeader = ({ left, leftPress, right, rightPress, style, text }) => (
  <View style={[styles.container, style]}>
    {left && <TouchIcon icon={left} onPress={leftPress} style={styles.left} />}
    {!left && <View style={styles.left} />}
       
    {text && (
      <View style={styles.containerText}>
        <Text style={styles.title}>NOW PLAYING FROM</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    )}

    {right && (
      <TouchIcon icon={right} onPress={rightPress} style={styles.right} />
    )}
    {!right && <View style={styles.right} />}
  </View>
);

ModalHeader.defaultProps = {
  left: null,
  leftPress: () => null,
  right: null,
  rightPress: () => null,
  style: {},
  text: null
};

ModalHeader.propTypes = {
  // optional
  left: PropTypes.element,
  leftPress: PropTypes.func,
  right: PropTypes.element,
  rightPress: PropTypes.func,
  style: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.object
  ]),
  text: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 44,
    paddingHorizontal: 24,
    paddingTop: device.iPhoneNotch ? 48 : 44
  },
  containerText: {
    alignItems: 'center',
    flex: 5,
    justifyContent: 'center'
  },
  text: {
    ...gStyle.textSpotifyBold16,
    color: colors.white,
    textAlign: 'center'
  },
  title: {
    ...gStyle.textSpotifyBold16,
    color: colors.greyInactive,
    paddingTop: 10,
    fontSize: 12,
    textAlign: 'center'
  },
  left: {
    color: "#ffffff",
    alignItems: 'flex-start',
    flex: 1,
    justifyContent: 'center'
  },
  right: {
    color: "#ffffff",
    alignItems: 'flex-end',
    flex: 1,
    justifyContent: 'center'
  }
});

export default ModalHeader;
