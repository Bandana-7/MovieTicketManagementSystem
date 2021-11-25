const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("ticket_management", "root", "root#123", {
  host: "localhost",
  dialect: "mysql",
});

sequelize.sync();

async () => {
  try {
    await sequelize.authenticate();
    console.log("conection establised");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = sequelize;