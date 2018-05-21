import Organism from './Organism';
import random from '../utils/random';

class Animal extends Organism {
  constructor(settings, genetics) {
    super(settings, genetics)

    this.health = 99;
    this.preference = genetics.preference || random.randDecimal(2);
  }

  move(direction) {
    let distance = random.randInt(0, this.speed);

    // change position
    if (direction === 'top') this.y -= distance;
    else if (direction === 'left') this.x -= distance;
    else if (direction === 'right') this.x += distance;
    else if (direction === 'bottom') this.y += distance;
    else if (direction === 'current') {

      // randomly choose top/left/right/bottom
      if (Math.random() >= 0.5) distance = 0 - distance;
      Math.random() >= 0.5 ? this.x += distance : this.y += distance;
    }

    // make sure it's not overflowing
    // this.keepInBounds()
  }
}

export default Animal;
