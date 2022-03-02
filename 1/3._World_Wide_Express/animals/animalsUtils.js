//import animals from "./animals.json";
//const animals = require("./animals.json");
const { animals, otherAnimals } = require("./animals.json");

function ammountOfAnimals() {
    return animals.length;
}

module.exports = (
    animals, ammountOfAnimals()
)
