// src/controllers/budget.controller.js
import * as response from "@utils/response";
import { catchAsync } from "@utils/catchAsync";
import budgetService from "@services/budget.service";

const createBudget = catchAsync(async (req, res) => {
    const newBudget = await budgetService.createBudget(req.body);
    response.created(res, newBudget);
});

const getBudgetById = catchAsync(async (req, res) => {
    const budget = await budgetService.getBudgetById(req.params.id);
    response.success(res, budget);
});

const getAllBudgets = catchAsync(async (req, res) => {
    const budgets = await budgetService.getAllBudgets();
    response.success(res, budgets);
});

const updateBudget = catchAsync(async (req, res) => {
    const updatedBudget = await budgetService.updateBudget(req.params.id, req.body);
    response.success(res, updatedBudget);
});

const deleteBudget = catchAsync(async (req, res) => {
    await budgetService.deleteBudget(req.params.id);
    response.noContent(res); // 204 No Content for a successful deletion
});

export const budgetController = {
    createBudget,
    getBudgetById,
    getAllBudgets,
    updateBudget,
    deleteBudget,
};