import { DataTypes } from "sequelize";
import sequelize from "../../db";

const EhcUser = sequelize.define("EhcUser", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: DataTypes.ENUM("superadmin"),
    allowNull: false,

  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  meta: {
    type: DataTypes.JSON,
    allowNull: true,
  }
}, {
  tableName: "ehcusers",
});

export default EhcUser;
