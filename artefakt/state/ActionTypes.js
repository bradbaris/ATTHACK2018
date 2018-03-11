export default defineActionConstants([
  'SET_CURRENT_USER',
  'SIGN_IN',
  'SIGN_OUT',
  'SET_ARTWORKS',
  'COMPUTE_DISTANCES',
  'SET_NEARBY_ARTWORKS',
  'SET_FAVORITED_ARTWORKS',
  'ADD_FAVORITED_ARTWORK',
  'REMOVE_FAVORITED_ARTWORK',
  'TOGGLE_FAVORITED_ARTWORK',
]);

function defineActionConstants(names) {
  return names.reduce((result, name) => {
    result[name] = name;
    return result;
  }, {});
}
