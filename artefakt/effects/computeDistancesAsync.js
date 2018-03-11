import { Platform } from 'react-native';
import { Location, Permissions } from 'expo';
import geolib from 'geolib';

import Actions from '../state/Actions';

export default async function computeDistancesAsync({dispatch, getState}) {
  let { artworks } = getState();
  let { status } = await Permissions.askAsync(Permissions.LOCATION);
  if (status !== 'granted') { return; }

  let { coords } = await Location.getCurrentPositionAsync({
    enableHighAccuracy: Platform.OS === 'ios',
  });

  let rangeCheck = false;
  let artworksWithDistances = artworks.all.map(artwork => {
    let distanceM = geolib.getDistance(
      {latitude: coords.latitude, longitude: coords.longitude},
      {latitude: artwork.latitude, longitude: artwork.longitude},
    );

    if (distanceM < 50.0) {
      rangeCheck = true;
    }

    let distanceKm = (distanceM / 1000.0).toFixed(2);
    let formattedDistance = `${distanceKm}km`;

    let direction = geolib.getCompassDirection(
      {latitude: coords.latitude, longitude: coords.longitude},
      {latitude: artwork.latitude, longitude: artwork.longitude},
    );

    return artwork.
      set('distance', formattedDistance).
      set('direction', direction).
      set('rangeCheck', rangeCheck);
  });


  let nearbyArtworks = artworksWithDistances.
    sortBy(artwork => artwork.distance).
    map(artwork => artwork.id);

  dispatch(Actions.setArtworks(artworksWithDistances));
  dispatch(Actions.setNearbyArtworks(nearbyArtworks));
}
