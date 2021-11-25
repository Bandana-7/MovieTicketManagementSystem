const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Movie = sequelize.define("movie", {
  moviename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING(1234),
    allowNull: false,
  },
  ratings: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  time: {
    type: DataTypes.DATE,
  },
 numberofseats: {
     type: DataTypes.INTEGER,
 }
});

module.exports = Movie;