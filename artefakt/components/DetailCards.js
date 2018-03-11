import React from 'react';
import {
  ActivityIndicator,
  Image,
  InteractionManager,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import FadeIn from 'react-native-fade-in-image';
import ReadMore from '@expo/react-native-read-more-text';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import { MapView } from 'expo';
import { openImageGallery } from '@expo/react-native-image-gallery';
import { MaterialIcons } from '@expo/vector-icons';

import Actions from '../state/Actions';
import { RegularText, BoldText, FancyText } from './StyledText';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';

import customMarker from '../assets/images/icon.png';

export class DescriptionCard extends React.Component {
  
  render() {
    let { text, rangeCheck } = this.props;

    if (!rangeCheck) {
      return (
        <View>
          <View style={styles.cardLabel}>
            <View style={styles.cardBody}>
              <BoldText style={styles.cardLock}>&#x1f512;</BoldText>
            </View>
          </View>
        </View>
      );
    }

    return (
      <View>
        <View style={styles.cardLabel}>
          <BoldText style={styles.cardLabelTextDesc}>History & Lore</BoldText>
        </View>

        <View style={styles.card}>
          <View style={styles.cardBody}>
            <ReadMore
              numberOfLines={10}
              renderTruncatedFooter={this._renderTruncatedFooter}
              renderRevealedFooter={this._renderRevealedFooter}>
              <RegularText style={styles.cardTextThinner}>{text}</RegularText>
            </ReadMore>
          </View>
        </View>
      </View>
    );
  }

  _renderTruncatedFooter = handlePress => {
    return (
      <RegularText
        style={{ color: Colors.tintColor, marginTop: 5 }}
        onPress={handlePress}>
        Read more
      </RegularText>
    );
  };

  _renderRevealedFooter = handlePress => {
    return (
      <RegularText
        style={{ color: Colors.tintColor, marginTop: 5 }}
        onPress={handlePress}>
        Show less
      </RegularText>
    );
  };
}

export class SummaryCard extends React.Component {

  render() {
    let { title, creator, credit, objectid, discipline, latitude, longitude, location, distance, direction, year} = this.props;
    let coordinates = `${latitude}, ${longitude}`;
    
    if (distance) {
      coordinates = `${distance} ${direction.exact}`;
    }

    return (
      <View style={[styles.card, styles.summaryContainer]}>
        <View style={styles.cardBody}>
          <BoldText style={styles.cardBearing}>{coordinates}</BoldText>
          <RegularText style={styles.cardTextCenter}>Artist: {creator}</RegularText>
          <RegularText style={styles.cardTextCenter}>{discipline}, {year} (ID: {objectid})</RegularText>
          <RegularText style={styles.cardTextCenter}>{credit}</RegularText>
        </View>
      </View>
    );
  }
}

export class MapCard extends React.Component {
  state = {
    shouldRenderMap: false,
    shouldRenderOverlay: true,
  };

  componentDidMount() {
    this._isMounted = true;

    InteractionManager.runAfterInteractions(() => {
      this._isMounted && this.setState({ shouldRenderMap: true });
      setTimeout(() => {
        this._isMounted && this.setState({ shouldRenderOverlay: false });
      }, 700);
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let { location, title, accentColor } = this.props.artwork;

    return (
      <View style={[styles.card, styles.mapContainer]}>
        {this._maybeRenderMap()}
        {this._maybeRenderOverlay()}
        <TouchableNativeFeedback onPress={this.props.onPress}>
          <View style={styles.cardAction}>
            <View style={styles.cardActionLabel}>
              <RegularText style={styles.cardActionText}>
                {location}
              </RegularText>

              <RegularText style={styles.cardActionSubtitleText}>
                Honolulu, Hawaii, USA
              </RegularText>
            </View>

            <MaterialIcons name="directions" style={styles.iconMarginRight} size={25} color={accentColor} />
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  _maybeRenderOverlay() {
    if (!this.state.shouldRenderOverlay) {
      return;
    }

    if (this.state.shouldRenderMap) {
      return (
        <View
          style={[
            styles.map,
            {
              backgroundColor: '#fff',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
            },
          ]}
        />
      );
    } else {
      return <View style={[styles.map, { backgroundColor: '#fff' }]} />;
    }
  }

  _maybeRenderMap() {
    if (!this.state.shouldRenderMap) {
      return;
    }

    let { title, latitude, longitude, id } = this.props.artwork;

    return (
      <MapView
        cacheEnabled={Platform.OS === 'android'}
        style={styles.map}
        loadingBackgroundColor="#FAFAFA"
        loadingEnabled={false}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.006,
          longitudeDelta: 0.006,
        }}>
        <MapView.Marker 
          coordinate={{ latitude, longitude }} 
          title={title} 
          key={id} 
          image={customMarker}
        />
      </MapView>
    );
  }
}

@connect((data, props) => FavoritedCard.getDataProps(data, props))
export class FavoritedCard extends React.Component {
  static getDataProps(data, props) {
    let { artworkId } = props;
    let isFavorited = data.artworks.favorited.includes(artworkId);

    return {
      isFavorited,
    };
  }

  _onToggleFavorited = () => {
    if (this.props.isFavorited) {
      this.props.dispatch(Actions.removeFavoritedArtwork(this.props.artworkId));
    } else {
      this.props.dispatch(Actions.addFavoritedArtwork(this.props.artworkId));
    }
  };

  render() {
    let { isFavorited } = this.props;

    return (
      <View style={{ marginTop: 15 }}>
        <View style={styles.card}>
          <TouchableNativeFeedback
            onPress={this._onToggleFavorited}
            fallback={TouchableHighlight}
            underlayColor="#eee">
            <View style={[styles.cardBody, styles.favoritedCardBody]}>
              <MaterialIcons
                name={isFavorited ? 'check-box' : 'check-box-outline-blank'}
                size={25}
                color="#18ba18"
                style={{ opacity: isFavorited ? 1 : 0.5 }}
              />
              <View style={{ flex: 1 }}>
                <RegularText
                  style={[
                    styles.favoritedCardText,
                    { opacity: isFavorited ? 1 : 0.85 },
                  ]}>
                  {isFavorited
                    ? "Artwork saved to Favorites!"
                    : "Add to Favorites"}
                </RegularText>
              </View>

            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    height: 150,
    width: Layout.window.width,
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
  },
  cardBearing: {
    fontSize: 36,
    color: '#000',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardBody: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cardLabel: {
    marginTop: 20,
    paddingLeft: 8,
    paddingBottom: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',    
  },
  cardLabelText: {
    fontSize: 15,
    color: '#313131',
  },
  cardLabelTextDesc: {
    fontSize: 20,
    color: '#313131',
    textAlign: 'center',
  },
  cardAction: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardActionLabel: {
    flex: 1,
    paddingHorizontal: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#424242',
  },  
  cardTextThinner: {
    fontSize: 14,
    color: '#424242',
    marginLeft: 30,
    marginRight: 30,
  },
  cardTextCenter: {
    fontSize: 14,
    color: '#424242',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardLock: {
    fontSize: 72,
    color: '#425470',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardActionText: {
    fontSize: 13,
    color: '#424242',
  },
  cardActionSubtitleText: {
    fontSize: 12,
    marginTop: -1,
    color: '#9E9E9E',
  },
  mapContainer: {
    marginTop: 0,
  },
  imageLoadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 125,
    marginVertical: 10,
  },
  summaryContainer: {
    marginTop: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoritedCardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 9,
  },
  favoritedCardText: {
    color: '#888',
    fontSize: 14,
    marginLeft: 5,
    marginBottom: 1,
  },
  iconMarginRight: {
    marginRight: 10,
  },
});
