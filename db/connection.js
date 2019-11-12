const Sequelize = require("sequelize");
const connection = new Sequelize("postgres://localhost:5432/acme_nouns", {
  logging: false
  //This keeps the giant block of code from generating inside the console.
});

module.exports = connection;
