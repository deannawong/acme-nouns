const { STRING } = require("sequelize");
const db = require("../connection.js");

const Places = db.define("places", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    notEmpty: true
  }
});

module.exports = Places;
