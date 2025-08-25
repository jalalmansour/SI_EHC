import { DataTypes, Model } from "sequelize";
import Role from "./Role";
import Department from "./Department";

class User extends Model {}

export const initUserModel = (sequelize) => {
    User.init({
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
            type: DataTypes.STRING,
            allowNull: true,
        },
        departmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
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
        sequelize,
        modelName: 'User',
        tableName: "Users",
    });

    return User;
};