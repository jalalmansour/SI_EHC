import { DataTypes } from "sequelize";
import sequelize from "../db";
import Role from "./role";
import Department from "./department";
// Assuming you will have a Company model, but not required for this definition
// import Company from "./company";

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: "id",
        },
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

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    city: {
        type: DataTypes.STRING,
    },
    postalCode: {
        type: DataTypes.STRING,
    },
    country: {
        type: DataTypes.STRING,
    },
    birthDate: {
        type: DataTypes.DATEONLY,
    },

    position: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    avatar: {
        type: DataTypes.STRING, // URL to the image file
        allowNull: true,
    },

    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: true, // A user might not have a department yet
        references: {
            model: Department,
            key: 'id',
        },
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },

}, {
    tableName: "Users",
});

export default User;