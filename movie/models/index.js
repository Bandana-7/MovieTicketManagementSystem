const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const User = sequelize.define("backend1", {
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull:false,
    unique:true,
  },
  roll:{
    type: DataTypes.INTEGER,
    defaultValue:0,
  },
});

module.exports = User;