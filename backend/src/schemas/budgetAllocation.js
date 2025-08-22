// src/schemas/budgetAllocation.js
import { DataTypes } from 'sequelize';
import sequelize from '../db';

const BudgetAllocation = sequelize.define('BudgetAllocation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    allocatedBudget: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    usedBudget: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
}, { tableName: 'BudgetAllocations' });

export default BudgetAllocation;