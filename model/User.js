import Sequelize from "sequelize";
import connection from "../database/db.js";

const User = connection.define("agents", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  firstName: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING(),
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING(),
    unique: true,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING(),
    allowNull: true,
  },

  password: {
    type: Sequelize.STRING(),
    allowNull: false,
  },
});

export default User;
