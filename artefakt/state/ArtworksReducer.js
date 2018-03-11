import ActionTypes from './ActionTypes';
import { ArtworksState, Artwork } from './Records';

class ArtworksReducer {
  static reduce(state = new ArtworksState(), action) {
    if (ArtworksReducer[action.type]) {
      return ArtworksReducer[action.type](state, action);
    } else {
      return state;
    }
  }

  static [ActionTypes.SET_ARTWORKS](state, action) {
    let artworks = action.artworks.sortBy(artwork => artwork.id);
    return state.set('all', artworks);
  }

  static [ActionTypes.SET_NEARBY_ARTWORKS](state, action) {
    return state.set('nearby', action.artworkIds);
  }

  static [ActionTypes.SET_FAVORITED_ARTWORKS](state, action) {
    return state.set('favorited', action.artworkIds);
  }

  static [ActionTypes.ADD_FAVORITED_ARTWORK](state, action) {
    let favorited = state.favorited.push(action.artworkId);
    return state.set('favorited', favorited);
  }

  static [ActionTypes.REMOVE_FAVORITED_ARTWORK](state, action) {
    let index = state.favorited.indexOf(action.artworkId);

    if (index === -1) {
      return state;
    }

    return state.set('favorited', state.favorited.delete(index));
  }
}

export default ArtworksReducer.reduce;
