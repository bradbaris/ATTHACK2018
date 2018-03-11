import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import FadeIn from 'react-native-fade-in-image';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import { MaterialIcons } from '@expo/vector-icons';

import Layout from '../constants/Layout';
import { RegularText, BoldText } from './StyledText';
import formatTime from '../util/formatTime';

export default class ArtworkListItem extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.artwork !== this.props.artwork;
  }

  render() {
    let { smallLogo, title } = this.props.artwork;

    return (
      <TouchableNativeFeedback
        delayPressIn={80}
        onPress={this.props.onPress}
        delayPressIn={80}
        style={styles.container}
        fallback={TouchableHighlight}
        underlayColor="#ccc">
        <View style={styles.logoContainer}>
          <FadeIn
            placeholderStyle={{
              backgroundColor:
                Platform.OS === 'android' ? 'transparent' : '#eee',
            }}>
            <Image
              resizeMode="cover"
              source={{ uri: smallLogo }}
              style={styles.logo}
            />
          </FadeIn>
        </View>

        <View style={styles.infoContainer}>
          <RegularText style={styles.name}>{title}</RegularText>

          <RegularText style={styles.hours}>
            {this._renderArtworkType()}
          </RegularText>

          <RegularText style={styles.address}>
            {this._renderArtist()}
          </RegularText>
        </View>

        <View style={styles.buttonContainer}>
          <MaterialIcons name="chevron-right" size={30} color="#b8c3c9" />
        </View>
      </TouchableNativeFeedback>
    );
  }

  _renderArtworkType() {
    let { discipline, year } = this.props.artwork;
    return `${discipline}, ${year}`;
  }

  _renderArtist() {
    let { creator } = this.props.artwork;
    return creator;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: Platform.OS === 'android' ? 1 : StyleSheet.hairlineWidth,
    width: Layout.window.width,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 16,
  },
  hours: {
    fontSize: 12,
  },
  address: {
    fontSize: 12,
  },
  logoContainer: {
    padding: 15,
  },
  logo: {
    width: 60,
    height: 60,
  },
  buttonContainer: {
    paddingRight: 5,
  },
});
