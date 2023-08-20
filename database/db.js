import { Sequelize } from "sequelize";

const conn = new Sequelize("estate", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default conn;
