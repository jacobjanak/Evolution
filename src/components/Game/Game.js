import React from 'react';
import World from '../World';
import Menu from '../Menu';
import defaultSettings from '../../settings';
import spawn from '../../utils/spawn';

// global variables
let i;

class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      settings: defaultSettings,
      tiles: []
    };

    this.changeSettings = this.changeSettings.bind(this);
  }

  changeSettings = (newSettings) => {
    this.setState({ settings: newSettings })
    this.updateTileCount()
  }

  updateTileCount() {
    const { height, width } = this.props.settings.world;

    const existing = this.state.tiles.length;
    const needed = height * width;

    if (existing !== needed) {
      const difference = needed - existing;
      let tiles = this.state.tiles;

      if (difference > 0) {
        tiles = spawn.tiles(difference, tiles);
      }

      else if (difference < 0) {
        //NOTE: make this fancier so that tiles stay in the same place
        tiles.length = needed;
      }

      this.setState({ tiles: tiles })
    }
  }

  componentWillMount() {
    this.updateTileCount()
  }

  render() {
    return (
      <div id="game">
        <Menu settings={this.state.settings} changeSettings={this.changeSettings} />
        <World settings={this.state.settings} tiles={this.state.tiles} />
      </div>
    );
  }
}

export default Game;
