import { DataTypes, Model } from "sequelize";

class Department extends Model {}

export const initDepartmentModel = (sequelize) => {
    Department.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
        },
    }, {
        sequelize,
        modelName: 'Department',
        tableName: "Departments",
    });

    return Department;
};