import { AsyncStorage } from 'react-native';

const Keys = {
  User: 'User',
  FavoritedArtworks: 'Favorited',
};

async function getUserAsync() {
  let results = await AsyncStorage.getItem(Keys.User);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveUserAsync(user) {
  return AsyncStorage.setItem(Keys.User, JSON.stringify(user));
}

function removeUserAsync() {
  return AsyncStorage.removeItem(Keys.User);
}

function saveFavoritedArtworksAsync(artworkIds) {
  return AsyncStorage.setItem(Keys.FavoritedArtworks, JSON.stringify(artworkIds));
}

async function getFavoritedArtworksAsync() {
  let results = await AsyncStorage.getItem(Keys.FavoritedArtworks);

  try {
    return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function clearAllAsync() {
  return AsyncStorage.clear();
}

export default {
  saveUserAsync,
  getUserAsync,
  removeUserAsync,
  saveFavoritedArtworksAsync,
  getFavoritedArtworksAsync,
  clearAllAsync,
};
