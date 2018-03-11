import React from 'react';
import {
  TouchableHighlight,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import Actions from '../state/Actions';
import { RegularText, BoldText } from '../components/StyledText';

@connect(data => SettingsScreen.getDataProps(data))
export default class SettingsScreen extends React.Component {
  static getDataProps(data) {
    return {
      currentUser: data.currentUser,
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this._renderAccountSection()}
      </ScrollView>
    );
  }

  _renderAccountSection() {
    let { currentUser } = this.props;
    let signOutText;

    if (currentUser.isGuest) {
      signOutText = 'Sign out (you are currently a Guest)';
    } else {
      signOutText = `Sign out`;
    }

    return (
      <View>
        <View style={styles.cardLabel}>
          <View style={[styles.cardBody, {flexDirection: 'column'}]}>
            <BoldText style={styles.cardCopy}>
              Hello AT&T Hackathon Honolulu 2018!
            </BoldText>

            <RegularText style={styles.cardCopy}>
              Welcome to Artifact, an app made to promote the arts and to encourage folks to explore their city.
              In short, it revolves around geocached 'tour guide' stories for public artworks, unlocked by user proximity.
            </RegularText>
            <RegularText style={styles.cardCopy}>
              Each public artwork has a tale behind it, and by approaching each artwork's geolocation, you will unlock 
              the stories and facts surrounding each piece. Art tells a story, invisible to the eye— get out there and discover it!
            </RegularText>
            <RegularText style={styles.cardCopy}>
              This project is hacked together by Brad Baris with the help of the Expo framework, open data, MIT-licensed source code, 
              massive amounts of caffeine and a sleepless night. Idea, Design, Dev, Product.
            </RegularText>
          </View>
        </View>

        <View style={styles.card}>
          <TouchableNativeFeedback
            onPress={this._handlePressSignOut}
            fallback={TouchableHighlight}
            underlayColor="#eee">
            <View style={[styles.cardBody, {flexDirection: 'row'}]}>
              <MaterialIcons
                name="exit-to-app"
                size={25}
                style={{transform: [{rotate: '180deg'}]}}
              />

              <RegularText style={styles.signOutText}>
                {signOutText}
              </RegularText>
            </View>
          </TouchableNativeFeedback>
        </View>

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _handlePressSignOut = () => {
    this.props.dispatch(Actions.signOut());
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  card: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E8E8E8',
    backgroundColor: '#fff',
  },
  cardBody: {
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  cardLabel: {
    marginTop: 20,
    paddingLeft: 8,
    paddingBottom: 5,
  },
  cardLabelText: {
    fontSize: 15,
    color: '#313131',
  },
  cardCopy: {
    marginBottom: 20,
  },
  signOutText: {
    fontSize: 15,
    marginLeft: 8,
    marginTop: 1,
  },
});
