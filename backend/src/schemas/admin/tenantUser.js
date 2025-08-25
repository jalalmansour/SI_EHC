import { DataTypes, Model } from "sequelize";

// Define the class
class TenantUser extends Model {}

// Create and export the initializer function
export const initTenantUserModel = (sequelize) => {
    TenantUser.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            comment: 'The master email for the user, unique across all tenants.'
        },
        tenantId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Tenants',
                key: 'id'
            }
        },
        userIdInTenant: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: 'The ID of the user in their own private tenant database.'
        }
    }, {
        sequelize,
    });

    return TenantUser;
};