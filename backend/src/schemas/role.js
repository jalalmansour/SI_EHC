import { DataTypes, Model } from "sequelize";

class Role extends Model {}

export const initRoleModel = (sequelize) => {
    Role.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'Role',
        tableName: "Roles",
    });

    return Role;
};