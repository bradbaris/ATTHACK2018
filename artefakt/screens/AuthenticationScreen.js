import React from 'react';
import { Alert, Image, Platform, StyleSheet, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { Facebook } from 'expo';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import FadeIn from 'react-native-fade-in-image';

import Actions from '../state/Actions';
import Layout from '../constants/Layout';
import { RegularText } from '../components/StyledText';
import { User } from '../state/Records';

@connect()
export default class AuthenticationScreen extends React.Component {
  render() {
    return (
      <ImageBackground source={require('../splash.png')} style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableNativeFeedback
            onPress={this._signInWithFacebook}
            style={styles.facebookButton}>
            <RegularText style={styles.facebookButtonText}>
              Sign in with Facebook
            </RegularText>
          </TouchableNativeFeedback>

          <TouchableNativeFeedback
            onPress={this._continueAsGuest}
            style={styles.guestButton}>
            <RegularText style={styles.guestButtonText}>
              Continue as a Guest
            </RegularText>
          </TouchableNativeFeedback>
        </View>
      </ImageBackground>
    );
  }

  _signInWithFacebook = async () => {
    const result = await Facebook.logInWithReadPermissionsAsync(
      '2328782507347984',
      {
        permissions: ['public_profile'],
        behavior: Platform.OS === 'ios' ? 'web' : 'system',
      }
    );

    if (result.type === 'success') {
      let response = await fetch(
        `https://graph.facebook.com/me?access_token=${result.token}`
      );
      let info = await response.json();

      this.props.dispatch(
        Actions.signIn(
          new User({
            id: info.id,
            authToken: result.token,
            name: info.name,
            isGuest: false,
          })
        )
      );
    }
  };

  _continueAsGuest = () => {
    this.props.dispatch(Actions.signIn(new User({ isGuest: true })));
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  innerContainer: {
    flex: 1,
    marginTop: 300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    borderRadius: 5,
    width: 250,
  },
  guestButton: {
    marginTop: 15,
    backgroundColor: '#eee',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignItems: 'center',
    width: 250,
  },
  facebookButtonText: {
    fontSize: 15,
    color: '#fff',
  },
  guestButtonText: {
    fontSize: 15,
    color: 'rgba(0,0,0,0.9)',
  },
});
