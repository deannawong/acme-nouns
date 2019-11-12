const { STRING } = require("sequelize");
const db = require("../connection.js");

const People = db.define("people", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    notEmpty: true
  }
});

module.exports = People;
