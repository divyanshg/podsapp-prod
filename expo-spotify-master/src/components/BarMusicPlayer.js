import React, {useState, useEffect} from 'react';
import { Audio } from 'expo-av'
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { withNavigation } from 'react-navigation';
import Advertisment from './Advertisment';
import { FontAwesome } from '@expo/vector-icons';
import TextTicker from 'react-native-text-ticker'
// import MusicControl from 'react-native-music-control'
import { colors, device, gStyle, images } from '../constants';
import { color } from 'react-native-reanimated';

function BarMusicPlayer({navigation, episode}) {

    const [isPlaying, setisPlaying] = useState(false)
    const [playbackInstance, setInstance] = useState(new Audio.Sound())
    const [currentIndex, setCurrentIndex] = useState(0)
    const [volume, setVolume] = useState(1.0)
    const [isBuffering, setIsBuffering] = useState(false)

    useEffect(() => {
      (async () => {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
          shouldDuckAndroid: true,
          staysActiveInBackground: true,
      })
    })()
    }, [])

    useEffect(() => {
      if(episode){
        (async () => {
          if(isPlaying){
            await playbackInstance.stopAsync()
            // MusicControl.resetNowPlaying()
            // MusicControl.stopControl()
          }else{
            // MusicControl.setNowPlaying({
            //   title: episode.title,
            //   artwork: episode.image, // URL or RN's image require()
            //   artist: episode.channel,
            //   album: episode.show,
            //   color: 0xffffff, // Android Only - Notification Color
            //   colorized: true, // Android 8+ Only - Notification Color extracted from the artwork. Set to false to use the color property instead
            // })
          }
          await playbackInstance.unloadAsync()
          await loadAudio()
          await playbackInstance.playAsync()
          setisPlaying(true)
        })()
      }
    }, [episode])

  async function loadAudio() {
      await playbackInstance.unloadAsync()
      try {
        console.log(episode)
        const source = {
          uri: `http://10.1.1.169:3600/${episode.ShowId}/episode/${episode.EpisodeId}`
        }
    
        const status = {
          shouldPlay: isPlaying,
          volume
        }
    
        playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)     
        await playbackInstance.loadAsync(source, status, false)

        await setInstance(playbackInstance)

        } catch (e) {
          console.log(e)
        }
    }
    
    const onPlaybackStatusUpdate = status => {
      setIsBuffering(status.isBuffering)
    }

    
    const handlePlayPause = async () => {
      // loadAudio()
      isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
     
      setisPlaying(!isPlaying)
    }

    const iconPlay = isPlaying ? 'pause-circle' : 'play-circle';


    if(episode){
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.navigate('ModalEpisodePlayer', {isPlaying, handlePlayPause})}
        style={styles.container}
      >
        
        {episode && (
          <View style={styles.mainContainer}>
          <View style={styles.containerLinear}>
            <Image source={{uri:episode.image}} style={styles.imageBG} blurRadius={8} />
            {/* <LinearGradient fill={show.backgroundColor} /> */}
          </View>
            <View>
              <Image source={{uri:episode.image}} style={styles.image} />
            </View>
            <View style={styles.detailContainer}>
              <View style={styles.containerepisode}>
                <TextTicker duration={6000}
                  loop
                  bounce={false}
                  repeatSpacer={50}
                  marqueeDelay={2000} 
                  style={styles.title}>
                    {episode.title}
                  </TextTicker>
              </View>
              <View style={{display: "flex", "flexDirection": "row"}}>
                <Text numberOfLines={1} style={styles.show}>{episode.show} </Text>
                <Text numberOfLines={1} style={styles.channel}>{"·"} {episode.channel.name}</Text>
              </View>
            </View>
          </View>
        )}
        <TouchableOpacity
          activeOpacity={gStyle.activeOpacity}
          hitSlop={{ bottom: 10, left: 10, right: 10, top: 10 }}
          onPress={handlePlayPause}
          style={styles.containerIcon}
        >
          <FontAwesome color={colors.white} name={iconPlay} size={28} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }else{
    return(
      <View style={styles.mainContainerAd}>
        <Advertisment type="banner" />
      </View> 
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    display: "flex",
    flexDirection:"row",
  },
  mainContainerAd: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  detailContainer: {
    alignItems: "flex-start",
    marginTop: 6,
  }, 
  container: {
    alignItems: 'stretch',
    backgroundColor: colors.black,
    borderBottomColor: colors.blackBg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    height:75,
    justifyContent: 'space-between',
    opacity: 0.9,
    paddingVertical: 12,
    width: '100%',
  },
  containerLinear: {
    opacity: 0.25,
    position: 'absolute',
    top: -12,
    width: '150%',
    zIndex: device.web ? 5 : 0
  },
  imageBG: {
    height: 89,
    marginBottom: device.web ? 0 : 16,
    width: '100%',
  },
  containerIcon: {
    ...gStyle.flexCenter,
    width: 50
  },
  containerepisode: {
    ...gStyle.flexRowCenter,
    justifyContent: 'flex-start',
    overflow: 'hidden',
    width:280
  },
  title: {
    ...gStyle.textSpotify12,
    color: colors.white,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left"
  },
  show: {
    fontSize: 12,
    marginLeft: 0,
    color:"#999999",
    maxWidth: 200
  },
  channel: {
    fontSize: 12,
    marginLeft: 0,
    color:"#999999",
  },
  image: {
    borderRadius: 12,
    height: 50,
    width: 50,
    marginHorizontal: 10
  }
});

export default withNavigation(BarMusicPlayer);
