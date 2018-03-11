import LocalStorage from '../state/LocalStorage';

export default function updateFavoritedCacheAsync({getState}) {
  let { artworks } = getState();
  let { favorited } = artworks;

  LocalStorage.saveFavoritedArtworksAsync(favorited.toJS());
}
