const db = require("./connection.js");
const Places = require("./models/places.js");
const People = require("./models/people.js");
const Things = require("./models/things.js");
const seed = require("./seed.js");
// belongs to gets the foreign key
People.belongsTo(Places);
Places.hasMany(People);

Things.belongsTo(People);
People.hasMany(Things);

module.exports = {
  db,
  seed,
  models: {
    Places,
    People,
    Things
  }
};
