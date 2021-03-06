import random from './random';

// global variables
let k;

const find = {
  coords: (organism, settings) => {
    return {
      row: Math.floor(organism.y / settings.tile.size),
      column: Math.floor(organism.x / settings.tile.size)
    };
  },

  tileID: (organism, settings, coords = false) => {
    if (!coords) coords = find.coords(organism, settings);
    return coords.row * settings.world.width + coords.column;
  },

  adjacentTiles: (organism, tiles, settings) => {
    const coords = find.coords(organism, settings);
    const tileID = find.tileID(organism, settings, coords);

    // current
    const adjacentTiles = { current: tiles[tileID] };
    // top
    if (coords.row !== 0) {
      adjacentTiles.top = tiles[tileID - settings.world.width];
    }
    // left
    if (coords.column !== 0) {
      adjacentTiles.left = tiles[tileID - 1];
    }
    // right
    if (coords.column !== settings.world.width - 1) {
      adjacentTiles.right = tiles[tileID + 1];
    }
    // bottom
    if (coords.row !== settings.world.height - 1) {
      adjacentTiles.bottom = tiles[tileID + settings.world.width];
    }

    return adjacentTiles;
  },

  direction: (organism, adjacentTiles) => {
    // iterate over adjacent tiles and update the best tile
    let best;
    for (k in adjacentTiles) {

      // difference between this tile and organism's ideal tile
      const difference = Math.abs(
        adjacentTiles[k].fertility - organism.preference + random(-10, 10)
      );

      // check if this beats the best or if there's no best yet
      if (!best || difference <= best.difference) {
        best = {
          direction: k,
          difference: difference
        };
      }
    }

    return best.direction;
  }
}

export default find;
