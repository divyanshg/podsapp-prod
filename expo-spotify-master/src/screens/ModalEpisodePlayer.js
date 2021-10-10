import React, {useState, useEffect} from 'react';
import { Audio } from 'expo-av'
import { Image, Slider, StyleSheet, Text, View, StatusBar } from 'react-native';
import TextTicker from 'react-native-text-ticker'
import Advertisment from '../components/Advertisment';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { colors, device, func, gStyle, images } from '../constants';
// components
import ModalHeader from '../components/ModalHeader';
import TouchIcon from '../components/TouchIcon';

function ModalMusicPlayer ({navigation, screenProps}) {

    const [isPlaying, setPlaying] = useState(navigation.getParam("isPlaying", false))
    const setisPlaying = navigation.getParam("handlePlayPause")
    const { currentEpisodeData } = screenProps;
    const iconPlay = isPlaying ? 'pause-circle' : 'play-circle';

    const timePast = func.formatTime(0);
    const timeLeft = func.formatTime(currentEpisodeData.length);

    return (
      <View style={gStyle.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
        <View style={styles.containerLinear}>
            <Image source={{uri: currentEpisodeData.image}} style={styles.imageBG} blurRadius={20} />
            {/* <LinearGradient fill={show.backgroundColor} /> */}
          </View>
        <ModalHeader
          left={<Feather color={colors.greyLight} name="chevron-down" />}
          leftPress={() => navigation.goBack(null)}
          right={<Feather color={colors.greyLight} name="more-horizontal" />}
          text={currentEpisodeData.channel.name}
        />

        <View style={gStyle.p3}>
          <Image source={{uri: currentEpisodeData.image}} style={styles.image} />

          <View style={[gStyle.flexRowSpace, styles.containerDetails]}>
            <View style={styles.containerSong}>
              <TextTicker duration={6000}
                  loop
                  bounce={false}
                  repeatSpacer={150}
                  marqueeDelay={3000}  style={styles.song}>
                {currentEpisodeData.title}
              </TextTicker>
              <Text style={styles.channel}>{currentEpisodeData.show}</Text>
            </View>
          </View>

          <View style={styles.containerVolume}>
            <Slider
              minimumValue={0}
              maximumValue={currentEpisodeData.length}
              minimumTrackTintColor={colors.white}
              maximumTrackTintColor={colors.grey3}
              thumbTintColor={colors.white}
            />
            <View style={styles.containerTime}>
              <Text style={styles.time}>{timePast}</Text>
              <Text style={styles.time}>{`-${timeLeft}`}</Text>
            </View>
          </View>

          <View style={styles.containerControls}>
            <TouchIcon
              icon={<Feather color={colors.greyLight} name="heart" />}
              onPress={() => null}
            />
            <View style={gStyle.flexRowCenterAlign}>
              <TouchIcon
                icon={<Feather color={colors.greyLight} name="skip-back" />}
                onPress={() => null}
              />
              <View style={gStyle.pH3, styles.playIcon}>
                <TouchIcon
                  icon={<FontAwesome color={colors.white} name={iconPlay} />}
                  iconSize={72}
                  onPress={() => {setisPlaying();setPlaying(!isPlaying)}}
                />
              </View>
              <TouchIcon
              icon={<Feather color={colors.greyLight} name="skip-forward" />}
              onPress={() => null}
            />
            </View>
            <TouchIcon
              icon={<Feather color={colors.greyLight} name="share-2" />}
              onPress={() => null}
            />
          </View>
        </View>
        <View style={{alignItems: "center", justifyContent: "center"}}>
          <Advertisment type="banner" />
        </View>
      </View>
    );
}
const styles = StyleSheet.create({
  image: {
    // borderRadius: 30,
    height: device.width - 48,
    marginBottom: 16,
    marginVertical: device.iPhoneNotch ? 36 : 8,
    width: device.width - 48
  },
  containerDetails: {
    marginBottom: 16
  },
  containerSong: {
    alignItems: 'center',
    flex: 6,
    textAlign: 'center'
  },
  playIcon:{
    marginHorizontal: 35
  },
  containerLinear: {
    height: '100%',
    opacity:0.5,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: device.web ? 5 : 0
  },
  imageBG: {
    height: '100%',
    marginBottom: device.web ? 0 : 16,
    width: '100%',
  },
  song: {
    ...gStyle.textSpotifyBold24,
    color: colors.white
  },
  channel: {
    ...gStyle.textSpotify18,
    color: colors.greyInactive,
    fontSize: 13,
    marginBottom: 10,
    marginTop: 3,
    textAlign: 'center'
  },
  containerTime: {
    ...gStyle.flexRowSpace,
    marginTop: 10,
    marginHorizontal: 15
  },
  time: {
    ...gStyle.textSpotify10,
    color: colors.greyInactive
  },
  containerControls: {
    ...gStyle.flexRowSpace,
    marginTop: device.iPhoneNotch ? 24 : 12,
    marginHorizontal: 15
  },
});

export default ModalMusicPlayer;
