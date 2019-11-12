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
    { name: "corgi", cost: 9999 },
    { name: "seltzer", cost: 10 },
    { name: "frisbee", cost: 5 }
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
      ).then(people => {
        return Promise.all(
          thingsToBe.map(thing => {
            return Things.create({
              name: thing.name,
              cost: 10,
              personId: people[2].id
            });
          })
        );
      });
    }
  );
};
module.exports = seed;
