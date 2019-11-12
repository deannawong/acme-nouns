const { STRING, INTEGER } = require("sequelize");
const db = require("../connection.js");

const Things = db.define("things", {
  name: {
    type: STRING,
    unique: true,
    allowNull: false,
    notEmpty: true
  },
  cost: {
    type: INTEGER,
    unique: false,
    allowNull: false,
    notEmpty: true
  }
});

module.exports = Things;
