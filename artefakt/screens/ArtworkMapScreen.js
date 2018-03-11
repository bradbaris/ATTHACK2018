import React from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import customMarker from '../assets/images/icon.png';

import { MapView } from 'expo';

@connect(data => ArtworkMapScreen.getDataProps(data))
export default class ArtworkMapScreen extends React.Component {
  static getDataProps(data) {
    return {
      artworks: data.artworks.all,
    };
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.artwork !== this.props.artwork;
  }

  render() {
    let { artworks } = this.props;

    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={styles.map}
          loadingBackgroundColor="#ffb82b"
          showsUserLocation
          initialRegion={{
            latitude: 21.285976,
            longitude: -157.8087917, 
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          {this.props.artworks.map(artwork => {
            let { latitude, longitude, title, isOpen, id } = artwork;

            return (
              <MapView.Marker
                key={id}
                image={customMarker}
                coordinate={{ latitude, longitude }}
                title={title}
              />
            );
          })}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
