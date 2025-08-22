// src/db.js
import { Sequelize } from "sequelize";

const username = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "password";
const database = process.env.DB_NAME || "mydatabase";
const host = process.env.DB_HOST || "localhost";
const dialect = process.env.DB_DIALECT || "mysql";

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: console.log, // facultatif
});

export default sequelize;
