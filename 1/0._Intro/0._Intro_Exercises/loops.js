// car batteries

const carBatteries = [0.1231, 0.4546, 0.2347, 0.9832];
//carBatteries.forEach((v, i) => { if (v < 0.9) carBatteries[i] += 0.2; });
//const chargedCarBatteries = carBatteries;
// ^ ^ use .map() to turn the above into one line
const chargedCarBatteries = carBatteries.map((v, i) => { if (v < 0.9) carBatteries[i] += 0.2; });

carBatteries.forEach((charge, index, batteries) => { console.log(`Battery with \u001B[33;1m${charge}\u001B[0m charge goes to charger ${index + 1}`); });

const drainedBatteries = carBatteries.filter((charge => charge < 0.5));
