import { PlantModel, HerbivoreModel, CarnivoreModel } from '../models';
import { random, keepInBounds, hasSpace } from '../utils';

const reproduce = {
  plants: (plants, settings) => {
    plants.forEach((plant) => {
      if (plant.pregnancy === 0) {
        const newPlant = new PlantModel(settings, plant);

        // randomize the position of the new plant
        newPlant.x += random(newPlant.size * -3, newPlant.size * 3);
        newPlant.y += random(newPlant.size * -3, newPlant.size * 3);

        // make sure it's in the map and not touching other plants
        if (keepInBounds(newPlant, settings, false)) {
          if (hasSpace(newPlant, plants)) {
            plants.push(newPlant);
            plant.offspring++
          }
        }

        // reset the cycle
        plant.pregnancy = plant.reproduction;
      } else {
        plant.pregnancy--
      }
    })

    return plants;
  },

  herbivores: (herbivores, settings) => {
    return reproduce.animals(HerbivoreModel, herbivores, settings);
  },

  carnivores: (carnivores, settings) => {
    return reproduce.animals(CarnivoreModel, carnivores, settings);
  },

  animals: (Model, animals, settings) => {
    animals.forEach((animal) => {
      if (animal.pregnancy === 0) {
        animals.push(new Model(settings, animal))
        animal.offspring++

        // reset the cycle
        animal.pregnancy = animal.reproduction;
      } else {
        animal.pregnancy--
      }
    })

    return animals;
  }
};

export default reproduce;
