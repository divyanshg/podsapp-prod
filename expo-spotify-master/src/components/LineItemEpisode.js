import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { colors, gStyle } from '../constants';

// {"_id":{"$oid":"61082bb7be1a64700be21c74"},"Name":"EP-1 | Behind the scenes in Radio 1's Live Lounge.","ShowId":"6e3a5d5f-f8e1-45b8-8fa5-ce825d240524","EpisodeId":"ac1dc308-b5a2-495c-a70d-1c1ba07bb929","FileId":{"$oid":"61082baebe1a64700be21919"}}

const LineItemEpisode = ({ active, downloaded, onPress, episodeData, channel, currentEpisodeData }) => {
  const activeColor = active ? colors.brandPrimary : colors.white;
  const iconPlay = currentEpisodeData && currentEpisodeData.EpisodeId == episodeData.EpisodeId ? <Image source={require("../assets/wave.gif")} style={styles.wave} /> : <FontAwesome color={colors.white} name="play-circle" size={28} /> 

  return (
    <TouchableOpacity
      activeOpacity={gStyle.activeOpacity}
      onPress={() => onPress(episodeData)}
      style={styles.mainCont}>
      <View style={styles.container}>
        <Image source={{uri: episodeData.image}} style={styles.episodeThumbnail} />
        <View
          style={gStyle.flex5}
        >
          <Text numberOfLines={2} style={[styles.title, { color: activeColor }]}>
            {episodeData.title}
          </Text>
        </View>

        <View style={styles.containerRight}>
          {iconPlay}
        </View>
      </View>
      <View style={styles.description}>
        <Text numberOfLines={2} style={{color: colors.greyLight, fontSize: 14, textAlign: 'left', fontWeight: '100'}}>{episodeData.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

LineItemEpisode.defaultProps = {
  active: false,
  downloaded: false
};

LineItemEpisode.propTypes = {
  // required
  onPress: PropTypes.func.isRequired,
  episodeData: PropTypes.shape({
    show: PropTypes.string.isRequired,
    channel: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }),
    image: PropTypes.string.isRequired,
    // length: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,

  // optional
  active: PropTypes.bool,
  downloaded: PropTypes.bool
};

const styles = StyleSheet.create({
  mainCont: {
    borderBottomWidth: 1,
    borderColor: colors.grey3,
    marginHorizontal: 8,
    paddingBottom: 15
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 'auto',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    paddingVertical: 16,
    width: '100%'
  },
  episodeThumbnail: {
    borderRadius: 8,
    height: 50,
    width:50
  },
  wave: {
    height:28,
    width:28,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "red",
    resizeMode: 'contain',
  },
  description:{
    marginHorizontal: 5,
    marginTop: -10
  },
  title: {
    ...gStyle.textSpotify16,
    color: colors.white,
    marginBottom: 0,
    marginHorizontal: 10
  },
  circleDownloaded: {
    alignItems: 'center',
    backgroundColor: colors.brandPrimary,
    borderRadius: 7,
    height: 14,
    justifyContent: 'center',
    marginRight: 8,
    width: 14
  },
  artist: {
    ...gStyle.textSpotify12,
    color: colors.greyInactive
  },
  containerRight: {
    alignItems: 'flex-end',
    flex: 1
  }
});

export default LineItemEpisode;
