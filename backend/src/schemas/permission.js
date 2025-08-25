import { DataTypes, Model } from "sequelize";

class Permission extends Model {}

export const initPermissionModel = (sequelize) => {
    Permission.init({
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
        module: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'Permission',
        tableName: 'Permissions',
        timestamps: true,
        indexes: [
            {
                unique: true,
                fields: ['module', 'action']
            }
        ]
    });

    return Permission;
};