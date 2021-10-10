import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Switch,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Advertisment from '../components/Advertisment';
import { Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import axios from 'axios';
import { colors, device, gStyle, images } from '../constants';
// import TextTicker from 'react-native-text-ticker'

// components
import LinearGradient from '../components/LinearGradient';
import LineItemEpisode from '../components/LineItemEpisode';
import TouchIcon from '../components/TouchIcon';
import TouchText from '../components/TouchText';


function show({ navigation, screenProps }) {
    const [show, setShow] = useState(null)
    const [scrollY, setScrollY] = useState(new Animated.Value(0))
    const [episode, setEpisode] = useState(null)
    const [title, setTitle] = useState(null)
    
    const showTitle = navigation.getParam('title');
    const ShowId = navigation.getParam('ShowId');
    const { currentEpisodeData, authToken } = screenProps;

    useEffect(() => {
      (async () => {
        await axios.get('http://10.1.1.169:3500/' + ShowId, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          }).then(({
              data: show
            }) => {
          setShow(show)
          setTitle(showTitle)
        }).catch(err => console.log(err))
        if(currentEpisodeData){
          console.log(currentEpisodeData)
          setEpisode(currentEpisodeData.title)
        }
      })()
    }, [])
  
  async function changeEpisode(episodeData) {
    const {changeEpisode } = screenProps;
    changeEpisode(episodeData);
    setEpisode(episodeData.title);
  }

  function toggleBlur() {
    const { setToggleTabBar } = screenProps;

    setToggleTabBar();
  }

    const { toggleTabBarState, setToggleTabBar } = screenProps;

    const stickyArray = device.web ? [] : [0];
    const headingRange = device.web ? [140, 200] : [230, 280];
    const shuffleRange = device.web ? [40, 80] : [40, 80];

    const opacityHeading = scrollY.interpolate({
      inputRange: headingRange,
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const opacityShuffle = scrollY.interpolate({
      inputRange: shuffleRange,
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    const styles = StyleSheet.create({
      blurview: {
        ...StyleSheet.absoluteFill,
        zIndex: 101
      },
      containerHeader: {
        height: 89,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: 100,
      },
      headerLinear: {
        height: 89,
        width: '100%'
      },
      tag: {
        borderRadius: 50,
        backgroundColor: colors.grey3,
        paddingHorizontal: 16,
        paddingVertical: 4,
        height: 44,
        width: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
      },
      viewMore: {
        borderRadius: 4,
        height: 125,
        width: 125,
        padding: 10,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
      },
      header: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: device.iPhoneNotch ? 48 : 44,
        position: 'absolute',
        top: 0,
        width: '100%'
      },
      headerTitle: {
        ...gStyle.textSpotifyBold16,
        color: colors.white,
        marginTop: 2,
        paddingHorizontal: 8,
        textAlign: 'center',
        width: device.width - 100
      },
      containerFixed: {
        alignItems: 'stretch',
        paddingTop: device.iPhoneNotch ? 94 : 80,
        position: 'absolute',
        width: '100%'
      },
      containerLinear: {
        opacity: 0.4,
        position: 'absolute',
        top: 0,
        width: '100%',
        zIndex: device.web ? 5 : 0
      },
      infoContainer: {
        display: "flex",
        flexDirection: "row",
      },
      episodeCount: {
        color: show ? show.backgroundColor : colors.brandPrimary,
        marginTop: 8,
        paddingHorizontal: 4
      },
      containerImage: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: colors.black,
        shadowOffset: {
          height: 8,
          width: 0
        },
        shadowOpacity: 0.8,
        shadowRadius: 6,
        zIndex: device.web ? 20 : 0,
      },
      imageBG: {
        height: 400,
        marginBottom: device.web ? 0 : 16,
        width: '100%',
      },
      image: {
        borderRadius: 10,
        height: 180,
        marginBottom: device.web ? 0 : 16,
        width: 180
      },
      containerTitle: {
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: -15,
        marginTop: device.web ? 8 : 20,
        textAlign: "center",
        zIndex: device.web ? 20 : 0,
      },
      title: {
        ...gStyle.textSpotifyBold20,
        color: colors.white,
        fontSize: 18,
        marginBottom: 8,
        textAlign: "center",
        width: 200
      },
      containershow: {
        zIndex: device.web ? 20 : 0
      },
      showInfo: {
        ...gStyle.textSpotify12,
        color: colors.white,
        marginBottom: 48,
        textAlign: "center"
      },
      containerScroll: {
        paddingTop: 89,
      },
      showDesc: {
        marginHorizontal: 12
      },
      moreFromChannel: {
        marginHorizontal: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
      },
      containerSticky: {
        marginTop: device.iPhoneNotch ? 238 : 234
      },
      containerShuffle: {
        alignItems: 'flex-start',
        height: 50,
        marginHorizontal: 20,
        marginTop: -30,
        shadowColor: colors.blackBg,
        shadowOffset: {
          height: -10,
          width: 0
        },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        zIndex: 10
      },
      containerStickyLinear: {
        position: 'absolute',
        top: 0,
        width: '100%'
      },
      btn: {
        backgroundColor: show ? show.backgroundColor : colors.brandPrimary,
        borderRadius: 25,
        height: 40,
        marginRight: -10,
        width: 120,
      },
      btnText: {
        ...gStyle.textSpotifyBold16,
        color: colors.white,
        letterSpacing: 1,
        textTransform: 'uppercase'
      },
      containerEpisodes: {
        alignItems: 'center',
        backgroundColor: colors.blackBg,
        // borderTopLeftRadius: 25,
        // borderTopRightRadius: 25,
      },
      containerDesc: {
        alignItems: 'center',
        backgroundColor: colors.blackBg,
        borderBottomWidth: 1,
        borderColor: colors.grey,
        marginTop: 0,
        paddingBottom: 20
      },
      containerAd: {
        alignItems: 'center',
        backgroundColor: colors.blackBg,
        borderBottomWidth: 1,
        borderColor: colors.grey,
        marginTop: 0,
        paddingTop: 20,
        paddingBottom: 20
      },
      row: {
        alignItems: 'stretch',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        width: '100%'
      },
      downloadText: {
        ...gStyle.textSpotifyBold18,
        color: colors.white,
        fontSize: 23
      }
    });

    // show data not set?
    if (show === null) {
      return (
        <View style={[gStyle.container, gStyle.flexCenter]}>
          <ActivityIndicator size="large" color={colors.brandPrimary} />
        </View>
      );
    }else{

    return (
      <View style={gStyle.container}>
        {toggleTabBarState ? (
          <BlurView intensity={99} style={styles.blurview} tint="dark" />
        ) : null}

        <View style={styles.containerHeader}>
          <Animated.View
            style={[styles.headerLinear, { opacity: opacityHeading }]}
          >
            <LinearGradient fill={show.backgroundColor} height={89} />
            <StatusBar translucent={true} backgroundColor={'transparent'} />
          </Animated.View>
          <View style={styles.header}>
            <TouchIcon
              icon={<Feather color={colors.white} name="chevron-left" />}
              onPress={() => navigation.goBack(null)}
            />
            <Animated.View style={{ opacity: opacityShuffle }}>
              <Text style={styles.headerTitle}>{show.title}</Text>
            </Animated.View>
            <TouchIcon
              icon={<Feather color={colors.white} name="more-horizontal" />}
              onPress={() => {
                setToggleTabBar();

                navigation.navigate('ModalMoreOptions', {
                  show
                });
              }}
            />
          </View>
        </View>

        <View style={styles.containerFixed}>
          <View style={styles.containerLinear}>
            <Image source={{uri : show.image}} style={styles.imageBG} blurRadius={8} />
            {/* <LinearGradient fill={show.backgroundColor} /> */}
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.containerImage}>
              <Image source={{uri: show.image}} style={styles.image} />
            </View>
            <View style={styles.containerTitle}>
              <Text style={styles.title}>
                {show.title}
              </Text>
              <View style={styles.containershow}>
                <Text style={styles.showInfo}>
                  {`Show by \n${show.channel.name} · ${show.released} \n\n`}
                  {`10K Plays`}
                </Text>
              </View>
              <View style={styles.containerShuffle}>
                <TouchText
                  onPress={() => null}
                  style={styles.btn}
                  styleText={styles.btnText}
                  text="Follow"
                />
              </View>
            </View>
          </View>
        </View>

        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={stickyArray}
          style={styles.containerScroll}
        >
          <View style={styles.containerSticky}>
            <Animated.View
              style={[
                styles.containerStickyLinear,
                { opacity: opacityShuffle }
              ]}
            >
            </Animated.View>
          </View>
          <View style={styles.containerEpisodes}>
            <View style={styles.row}>
              <View style={styles.tag}>
                <Text style={{color: colors.white, fontSize: 16}}>Space</Text>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.downloadText}>
                All Episodes
              </Text>
              <Text style={styles.episodeCount}>
                {show.episodes.length}
              </Text>
            </View>

            {show.episodes &&
              show.episodes.map((episode, index) => (
                <LineItemEpisode
                  active={episode === episode.title}
                  key={index.toString()}
                  onPress={changeEpisode}
                  channel={show.channel}
                  episodeData={{
                    ShowId: show.ShowId,
                    EpisodeId: episode.EpisodeId,
                    show: show.title,
                    channel: show.channel,
                    image: episode.image,
                    length: episode.seconds,
                    title: episode.title,
                    description: episode.description
                  }}
                  currentEpisodeData={currentEpisodeData}
                />
              ))}
          </View>
          <View style={styles.containerDesc}>
            <View style={styles.row}>
              <Text style={styles.downloadText}>
                About this show
              </Text>
            </View>
            <View style={styles.showDesc}>
              <Text numberOfLines={12} style={{color: colors.greyLight, fontSize: 16}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas neque non nibh egestas facilisis. Nam molestie quam et velit congue, ac ornare nibh blandit. Morbi diam risus, accumsan at venenatis eget, sollicitudin varius erat. Aliquam risus mi, blandit id mollis sit amet, pretium id purus. Curabitur blandit dolor sit amet mauris tristique dictum a eget ligula. Phasellus ante metus, iaculis sed orci at, molestie porta lacus. Maecenas eleifend nisl quis sapien sodales, nec fermentum dolor pellentesque. Cras a ullamcorper felis, vel eleifend lectus.
              </Text>
            </View>
          </View>
          <View style={styles.containerAd}>
            <View style={styles.showDesc}>
                <Advertisment type="largeBanner" />
            </View>
          </View>
          <View style={styles.containerDesc}>
            <View style={styles.row}>
              <Text numberOfLines={2} style={styles.downloadText}>
                More from {show.channel.name}
              </Text>
            </View>
            <View style={styles.moreFromChannel}>
              <View>
                <TouchableOpacity style={styles.viewMore}>
                  <Text style={{color: colors.white}}>View More</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={gStyle.spacer16} />
        </Animated.ScrollView>
      </View>
    );
  }
}

show.propTypes = {
  // required
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.object.isRequired
};



export default show;
