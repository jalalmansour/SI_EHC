import { DataTypes } from 'sequelize';
import { sequelize } from '../schemas';

const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // The unique key used in your code (e.g., 'users:create')
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    // The feature area or resource (e.g., 'users', 'budget')
    module: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // The specific operation (e.g., 'create', 'read', 'approve')
    action: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'Permissions',
    timestamps: true,
    // Add a unique constraint on the combination of module and action
    indexes: [
        {
            unique: true,
            fields: ['module', 'action']
        }
    ]
});

export default Permission;