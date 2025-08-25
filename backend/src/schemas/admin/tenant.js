import { DataTypes, Model } from "sequelize";

// Define the class for the model
class Tenant extends Model {}

// Create and export the initializer function
export const initTenantModel = (sequelize) => {
    Tenant.init({
        // Your column definitions are exactly the same
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            comment: 'The name of the client company.'
        },
        dbUri: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: 'The full connection URI for this tenant\'s private database.'
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            comment: 'An super-admin can disable a tenant by setting this to false.'
        }
    }, {
        sequelize, // Pass the dynamic connection instance
    });

    return Tenant;
};