// src/models/budget.model.js
import { Budget, TrainingDomain, BudgetAllocation, sequelize } from "../schemas";

const findAll = async () => {
    return await Budget.findAll({
        include: [{
            model: BudgetAllocation,
            as: 'allocations',
            include: [{
                model: TrainingDomain,
                as: 'domain'
            }]
        }],
        order: [['year', 'DESC'], ['createdAt', 'DESC']],
    });
};

const findById = async (id) => {
    return await Budget.findByPk(id, {
        include: [{
            model: BudgetAllocation,
            as: 'allocations',
            include: [{
                model: TrainingDomain,
                as: 'domain'
            }]
        }]
    });
};

const create = async (data) => {
    const { name, year, totalBudget, transversalPercentage, metierPercentage, description, allocations } = data;
    const t = await sequelize.transaction();
    try {
        const newBudget = await Budget.create({ name, year, totalBudget, transversalPercentage, metierPercentage, description, isActive: false, status: 'Actif' }, { transaction: t });
        if (allocations && allocations.length > 0) {
            const budgetAllocations = allocations.map(alloc => ({ budgetId: newBudget.id, trainingDomainId: alloc.trainingDomainId, allocatedBudget: alloc.allocatedBudget }));
            await BudgetAllocation.bulkCreate(budgetAllocations, { transaction: t });
        }
        await t.commit();
        return await findById(newBudget.id);
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const update = async (id, data) => {
    const budget = await findById(id);
    if (!budget) return null;
    await budget.update(data);
    return await findById(id);
};

const remove = async (id) => {
    const rowsDeleted = await Budget.destroy({ where: { id } });
    return rowsDeleted > 0;
};

export const budgetModel = {
    findAll,
    findById,
    create,
    update,
    remove,
};