// src/services/budget.service.js
import { budgetModel } from '../models/budget.model';
import { AppError } from '@utils/errors'; // <--- Corrected import
import httpStatus from 'http-status';

const createBudget = async (data) => {
    const newBudget = await budgetModel.create(data);
    return newBudget;
};

const getBudgetById = async (id) => {
    const budget = await budgetModel.findById(id);
    if (!budget) {
        throw new AppError("Budget not found", httpStatus.NOT_FOUND); // <--- Corrected class name
    }
    return budget;
};

const getAllBudgets = async () => {
    return await budgetModel.findAll();
};

const updateBudget = async (id, data) => {
    const updatedBudget = await budgetModel.update(id, data);
    if (!updatedBudget) {
        throw new AppError("Budget not found", httpStatus.NOT_FOUND); // <--- Corrected class name
    }
    return updatedBudget;
};

const deleteBudget = async (id) => {
    const success = await budgetModel.remove(id);
    if (!success) {
        throw new AppError("Budget not found", httpStatus.NOT_FOUND); // <--- Corrected class name
    }
    return true;
};

const budgetService = {
    createBudget,
    getBudgetById,
    getAllBudgets,
    updateBudget,
    deleteBudget,
};

export default budgetService;