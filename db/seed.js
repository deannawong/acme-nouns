const Places = require("./models/places.js");
const People = require("./models/people.js");
const Things = require("./models/things.js");

const seed = () => {
  const placesToBe = [{ name: "manhattan" }, { name: "brooklyn" }];
  const peopleToBe = [
    { name: "eliot" },
    { name: "prof" },
    { name: "ryan" },
    { name: "mark" }
  ];
  const thingsToBe = [
    { name: "corgi", price: 9999 },
    { name: "seltzer", price: 10 },
    { name: "frisbee", price: 5 }
  ];

  return Promise.all(placesToBe.map(place => Places.create(place))).then(
    places => {
      return Promise.all(
        peopleToBe.map(person => {
          return People.create({
            ...person,
            placeId: places[0].id
          });
        })
      );
    }
  );
};
module.exports = seed;
