import { DataTypes, Model } from "sequelize";
import User from "../user.js";

class VerificationToken extends Model {}

export const initVerificationTokenModel = (sequelize) => {
    VerificationToken.init({
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
            type: DataTypes.ENUM("EMAIL_VERIFICATION", "PASSWORD_RESET", "2FA", "PASSWORD_SETUP"),
            allowNull: false,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        tenantUserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'TenantUsers', // The name of the table in the super-admin DB
                key: 'id',
            },
        },
    }, {
        sequelize,
    });

    return VerificationToken;
};