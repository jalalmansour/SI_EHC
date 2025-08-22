// src/schemas/budget.js
import { DataTypes } from 'sequelize';
import sequelize from '../db';

const Budget = sequelize.define('Budget', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    totalBudget: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    transversalPercentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    metierPercentage: { type: DataTypes.DECIMAL(5, 2), allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: false },
    status: { type: DataTypes.ENUM('Actif', 'Clôturé'), defaultValue: 'Actif' },
}, { tableName: 'Budgets' });

export default Budget;