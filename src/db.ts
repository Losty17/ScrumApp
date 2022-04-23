import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME || "scrumapp",
  process.env.DB_USER || "root",
  process.env.DB_PASS || "",
  {
    dialect: "mysql",
    host: process.env.DB_HOST || "localhost",
    logging: false,
  }
);

export default db;
