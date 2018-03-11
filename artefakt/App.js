import { AppLoading, Font } from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider as ReduxProvider, connect } from 'react-redux';
import { List } from 'immutable';

import Actions from './state/Actions';
import AllArtworks from './data';
import AuthenticationScreen from './screens/AuthenticationScreen';
import ImageGalleryPortal from './components/ImageGalleryPortal';
import LocalStorage from './state/LocalStorage';
import RootNavigation from './navigation/RootNavigation';
import Store from './state/Store';
import { Artwork, User } from './state/Records';

export default class AppContainer extends React.Component {
  render() {
    return (
      <ReduxProvider store={Store}>
        <App {...this.props} />
      </ReduxProvider>
    );
  }
}

@connect(data => App.getDataProps)
class App extends React.Component {
  static getDataProps(data) {
    return {
      currentUser: data.currentUser,
    };
  }

  state = {
    isReady: false,
  };

  _loadAssetsAsync = async () => {
    return Font.loadAsync({
      ...Ionicons.font,
      'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
      'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Semibold.ttf'),
      'Spectrashell': require('./assets/fonts/Spectrashell.otf'),
    });
  };

  _loadCacheAsync = async () => {
    let user = new User(await LocalStorage.getUserAsync());
    let artworks = new List(AllArtworks.map(data => new Artwork(data)));
    let visitedArtworks = new List(
      await LocalStorage.getFavoritedArtworksAsync()
    );
    this.props.dispatch(Actions.setCurrentUser(user));
    this.props.dispatch(Actions.setArtworks(artworks));
    this.props.dispatch(Actions.setFavoritedArtworks(visitedArtworks));
  };

  _loadDataAndAssetsAsync = async () => {
    return Promise.all([this._loadAssetsAsync(), this._loadCacheAsync()]);
  };

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadDataAndAssetsAsync}
          onError={e => console.error(e)}
          onFinish={() => {
            this.setState({
              isReady: true,
            });
          }}
        />
      );
    }

    return (
      <View style={styles.container}>
        {isSignedIn(this.props.currentUser) ? (
          <RootNavigation />
        ) : (
          <AuthenticationScreen />
        )}
        <ImageGalleryPortal />
      </View>
    );
  }
}

function isSignedIn(userState) {
  return !!userState.authToken || userState.isGuest;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
