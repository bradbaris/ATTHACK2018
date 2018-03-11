import React from 'react';
import { connect } from 'react-redux';

import Actions from '../state/Actions';
import ArtworkDetails from '../components/ArtworkDetails';

@connect((data, props) => ArtworkDetailsScreen.getDataProps(data, props))
export default class ArtworkDetailsScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    }
  }

  static getDataProps(data, props) {
    let artworkId = props.navigation.state.params.artworkId;
    let artwork = data.artworks.all.find(artwork => artwork.id === artworkId);

    return {
      artwork,
    };
  }

  render() {
    return (
      <ArtworkDetails
        artwork={this.props.artwork}
        isFavorited={this.props.isFavorited}
        onToggleFavorited={this._onToggleFavorited}
      />
    );
  }
}
