import ActionTypes from './ActionTypes';

export default class Actions {
  static setCurrentUser(user) {
    return {
      type: ActionTypes.SET_CURRENT_USER,
      user,
    }
  }

  static signIn(user) {
    return {
      type: ActionTypes.SIGN_IN,
      user,
    }
  }

  static signOut() {
    return {
      type: ActionTypes.SIGN_OUT,
    }
  }

  static setArtworks(artworks) {
    return {
      type: ActionTypes.SET_ARTWORKS,
      artworks,
    }
  }

  static setNearbyArtworks(artworkIds) {
    return {
      type: ActionTypes.SET_NEARBY_ARTWORKS,
      artworkIds,
    }
  }

  static setFavoritedArtworks(artworkIds) {
    return {
      type: ActionTypes.SET_FAVORITED_ARTWORKS,
      artworkIds,
    }
  }

  static toggleFavoritedArtwork(artworkId) {
    return {
      type: ActionTypes.TOGGLE_FAVORITED_ARTWORK,
      artworkId,
    }
  }

  static addFavoritedArtwork(artworkId) {
    return {
      type: ActionTypes.ADD_FAVORITED_ARTWORK,
      artworkId,
    }
  }

  static removeFavoritedArtwork(artworkId) {
    return {
      type: ActionTypes.REMOVE_FAVORITED_ARTWORK,
      artworkId,
    }
  }

  static computeDistances() {
    return {
      type: ActionTypes.COMPUTE_DISTANCES,
    }
  }
}
