// src/schemas/trainingDomain.js
import { DataTypes } from 'sequelize';
import sequelize from '../db';

const TrainingDomain = sequelize.define('TrainingDomain', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, { tableName: 'TrainingDomains' });

export default TrainingDomain;