import * as React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { withNavigation } from 'react-navigation';
import { colors, gStyle, images } from '../constants';

const AlbumsHorizontal = ({ data, heading, navigation}) => (
  <View style={styles.container}>
    {heading && <Text style={styles.heading}>{heading}</Text>}

    <FlatList
      contentContainerStyle={styles.containerContent}
      data={data}
      horizontal
      keyExtractor={({ ShowId }) => ShowId.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          key={item.ShowId}
          activeOpacity={gStyle.activeOpacity}
          hitSlop={{ top: 10, left: 10, bottom: 10, right: 10 }}
          onPress={() => navigation.navigate('Album', { title: item.title, ShowId: item.ShowId })}
          style={styles.item}
        >
          <View style={styles.image}>
            {item.image && (
              <Image source={{uri:item.image}} style={styles.image} />
            )}
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )}
      showsHorizontalScrollIndicator={false}
    />
  </View>
);

AlbumsHorizontal.defaultProps = {
  heading: null
};

AlbumsHorizontal.propTypes = {
  // required
  data: PropTypes.array.isRequired,
  navigation: PropTypes.object.isRequired,

  // optional
  heading: PropTypes.string
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: '100%'
  },
  containerContent: {
    paddingLeft: 16
  },
  heading: {
    ...gStyle.textSpotifyBold18,
    color: colors.white,
    fontSize: 23,
    fontWeight: "bold",
    paddingBottom: 20,
    paddingLeft: 18,
    textAlign: 'left'
  },
  item: {
    borderRadius: 10,
    marginRight: 16,
    width: 148
  },
  image: {
    backgroundColor: colors.greyLight,
    borderRadius: 12,
    height: 148,
    width: 148
  },
  title: {
    ...gStyle.textSpotifyBold12,
    color: colors.white,
    marginTop: 4,
    textAlign: 'center'
  }
});

export default withNavigation(AlbumsHorizontal);
