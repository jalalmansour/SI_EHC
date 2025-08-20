import { DataTypes } from "sequelize";
import sequelize from "../db";

const Department = sequelize.define("Department", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },

}, {
    tableName: "Departments",
});

export default Department;