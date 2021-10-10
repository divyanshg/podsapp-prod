import React, {useState,useEffect} from 'react';
import { Animated, StyleSheet, View, Text, TouchableOpacity, StatusBar, ToastAndroid as Toast } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { colors, device, gStyle } from '../constants';

// components
import AlbumsHorizontal from '../components/AlbumsHorizontal';
import RecommendedAlbumsHorizontal from '../components/RecommendedAlbumsHorizontal'
import Advertisment from '../components/Advertisment';

function Home({
  navigation,
  screenProps
}) {
  const [scrollY, setScrollY] = useState(new Animated.Value(0));
  const [shows, setLoadedShows] = useState();
  const {authToken} = screenProps
  useEffect(() => {
    (async () => await axios.get('http://10.1.1.169:3500/tailored', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }).then(({
            data
          }) => {
      setLoadedShows(data)
    }))();
  }, [])

  const opacityIn = scrollY.interpolate({
    inputRange: [0, 128],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });

  const opacityOut = scrollY.interpolate({
    inputRange: [0, 48],
    outputRange: [1, 0],
    extrapolate: 'clamp'
  });

  const Shows = ({showsData: shows}) => {
    const showItem = shows.map(show => {
      if(show.id == "MFYS"){
        return <RecommendedAlbumsHorizontal data={show.shows} heading={show.title} />
      }else if(show.id == "ADS"){
        return <View style={{alignItems: 'center', justifyContent: 'center'}}><Advertisment type="medBanner" /></View>
      }else{
        return <AlbumsHorizontal data={show.shows} heading={show.title}/>
      }
    }
    )
    
    return (
      <>{showItem}</>
    )

  }

  return (
    <React.Fragment>
      {device.iPhoneNotch && (
        <Animated.View style={[styles.iPhoneNotch, { opacity: opacityIn }]} />
      )}

      <Animated.View style={[styles.containerHeader, { opacity: opacityOut }]}>
        <View style={styles.flexHeader}>
          <Text style={styles.headerHeading}>Explore</Text>
          <TouchableOpacity style={styles.newShow}>
            <Text style={{ color: colors.white, textAlign: 'center' }}>New Show</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <StatusBar translucent={true} backgroundColor={'black'} />

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={gStyle.container}
      >
        <View style={gStyle.spacer16} />

        {shows ? 
          <Shows showsData={shows}/>
        :
          <></>
        }
        <View style={gStyle.spacer16}></View>
      </Animated.ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  iPhoneNotch: {
    backgroundColor: colors.black70,
    height: 44,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 20
  },
  flexHeader: {
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  containerHeader: {
    alignItems: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: device.iPhoneNotch ? 60 : 34,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 10
  },
  headerHeading: {
    color: colors.white,
    fontSize: 40
  },
  newShow: {
    backgroundColor: colors.brandPrimary,
    borderRadius: 50,
    height: 35,
    marginTop: 15,
    paddingVertical: 6,
    textAlign: 'center',
    width: 100
  }
});

export default Home;
