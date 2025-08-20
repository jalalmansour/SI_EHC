// src/models/VerificationToken.js
import { DataTypes } from "sequelize";
import sequelize from "../db";
import User from "./User.js";

const VerificationToken = sequelize.define("VerificationToken", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    type: {
        type: DataTypes.ENUM("EMAIL_VERIFICATION", "PASSWORD_RESET", "2FA"),
        allowNull: false,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: "id",
        },
    },
}, {
    tableName: "VerificationTokens",
});


export default VerificationToken;
