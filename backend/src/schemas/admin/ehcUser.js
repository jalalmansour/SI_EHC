import { DataTypes, Model } from "sequelize";

// Define the class
class EhcUser extends Model {}

// Create and export the initializer function
export const initEhcUserModel = (sequelize) => {
    EhcUser.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        role: {
            type: DataTypes.ENUM("super-admin"),
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
    }, {
        sequelize
    });

    return EhcUser;
};