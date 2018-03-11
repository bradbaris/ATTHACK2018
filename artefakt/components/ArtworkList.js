import React from 'react';
import {
  ActivityIndicator,
  Animated,
  FlatList,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

import ArtworkListItem from './ArtworkListItem';

function artworksFromIds(all, ids) {
  return ids.map(id => all.find(artwork => artwork.id === id));
}

@withNavigation
@connect((data, props) => ArtworkList.getDataProps(data, props))
export default class ArtworkList extends React.Component {
  static getDataProps(data, props) {
    let { artworks } = data;
    let { all, nearby, favorited } = artworks;

    if (props.nearby) {
      artworks = artworksFromIds(all, nearby);
    } else if (props.favorited) {
      artworks = artworksFromIds(all, favorited);
    } else {
      artworks = all;
    }

    return {
      artworks,
    };
  }

  state = {
    renderContents: false,
  };

  componentDidMount() {
    this.props.setRef && this.props.setRef(this);
    setTimeout(() => {
      this.setState({ renderContents: true });
    }, 100);
  }

  componentDidUpdate() {
    this.props.setRef && this.props.setRef(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.artworks !== this.props.artworks ||
      nextState.renderContents !== this.state.renderContents
    );
  }

  scrollTo(opts) {
    this._scrollView._component.scrollTo(opts);
  }

  render() {
    return (
      <View onLayout={this.props.onLayout} style={styles.container}>
        {this.state.renderContents ? (
          <FlatList
            ref={view => {
              this._scrollView = view;
            }}
            key={item => item.id} 
            contentContainerStyle={this.props.contentContainerStyle}
            renderItem={this._renderItem}
            style={styles.container}
            data={this.props.artworks.toJS()}
            keyExtractor={item => item.title}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              height: 75,
            }}>
            <ActivityIndicator />
          </View>
        )}

        <StatusBar barStyle="default" />
      </View>
    );
  }

  _renderItem = ({ item }) => {
    return (
      <ArtworkListItem
        onPress={() => this._handlePressArtwork(item)}
        artwork={item}
        key={item => item.id}
      />
    );
  }

  _handlePressArtwork = artwork => {
    this.props.navigation.navigate('details', { artworkId: artwork.id });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
});
