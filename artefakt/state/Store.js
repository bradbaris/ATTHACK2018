import { applyMiddleware, combineReducers, createStore } from 'redux';
import { effectsMiddleware } from 'redux-effex';

import CurrentUserReducer from './CurrentUserReducer';
import ArtworksReducer from './ArtworksReducer';
import Effects from '../effects';

export default createStore(
  combineReducers({
    currentUser: CurrentUserReducer,
    artworks: ArtworksReducer,
  }),
  applyMiddleware(effectsMiddleware(Effects)),
);
