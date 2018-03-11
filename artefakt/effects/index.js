import ActionTypes from '../state/ActionTypes';
import computeDistancesAsync from './computeDistancesAsync';
import signInAsync from './signInAsync';
import signOutAsync from './signOutAsync';
import updateFavoritedArtworkCacheAsync from './updateFavoritedArtworkCacheAsync';

function genericErrorHandler({action, error}) {
  console.log({error, action});
}

export default [
  {action: ActionTypes.SIGN_IN, effect: signInAsync, error: genericErrorHandler},
  {action: ActionTypes.SIGN_OUT, effect: signOutAsync, error: genericErrorHandler},
  {action: ActionTypes.ADD_FAVORITED_ARTWORK, effect: updateFavoritedArtworkCacheAsync, error: genericErrorHandler},
  {action: ActionTypes.REMOVE_FAVORITED_ARTWORK, effect: updateFavoritedArtworkCacheAsync, error: genericErrorHandler},
  {action: ActionTypes.COMPUTE_DISTANCES, effect: computeDistancesAsync, error: genericErrorHandler},
];
