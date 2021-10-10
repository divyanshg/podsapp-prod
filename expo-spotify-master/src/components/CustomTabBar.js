import * as React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { BottomTabBar } from 'react-navigation-tabs';

// components
import BarMusicPlayer from './BarMusicPlayer';

const CustomTabBar = (props) => {
  const { screenProps } = props;
  const { currentEpisodeData, toggleTabBarState } = screenProps;

  return toggleTabBarState ? null : (
    <React.Fragment>
      <BarMusicPlayer episode={currentEpisodeData} />
      <BottomTabBar {...props} />
    </React.Fragment>
  );
};

CustomTabBar.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired
};

export default CustomTabBar;
