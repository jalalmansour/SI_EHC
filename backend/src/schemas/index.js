import sequelize from '../db';

// Import all Sequelize model files. The order of these imports doesn't matter.
import User from './user';
import Role from './role';
import Permission from './permission';
import Department from './department';
import Budget from './budget';
import TrainingDomain from './trainingDomain';
import BudgetAllocation from './budgetAllocation';

// --- Define All Model Associations ---
// This section ensures all models are linked correctly before the app starts.

// User and Role
User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role'
});
Role.hasMany(User, {
    foreignKey: 'roleId',
    as: 'users'
});

// User and Department
User.belongsTo(Department, {
    foreignKey: 'departmentId',
    as: 'department'
});
Department.hasMany(User, {
    foreignKey: 'departmentId',
    as: 'users'
});

// User and Permission (Many-to-Many for direct permissions)
User.belongsToMany(Permission, {
    through: 'UserPermissions',
    as: 'directPermissions',
    foreignKey: 'userId',
});
Permission.belongsToMany(User, {
    through: 'UserPermissions',
    as: 'users',
    foreignKey: 'permissionId'
});

// Role and Permission (Many-to-Many)
Role.belongsToMany(Permission, {
    through: 'RolePermissions',
    as: 'permissions',
    foreignKey: 'roleId',
});
Permission.belongsToMany(Role, {
    through: 'RolePermissions',
    as: 'roles',
    foreignKey: 'permissionId'
});

// Budget and its Allocations (One-to-Many)
Budget.hasMany(BudgetAllocation, {
    foreignKey: 'budgetId',
    as: 'allocations'
});
BudgetAllocation.belongsTo(Budget, {
    foreignKey: 'budgetId',
    as: 'budget'
});

// TrainingDomain and its Allocations (One-to-Many)
TrainingDomain.hasMany(BudgetAllocation, {
    foreignKey: 'trainingDomainId',
    as: 'allocations'
});
BudgetAllocation.belongsTo(TrainingDomain, {
    foreignKey: 'trainingDomainId',
    as: 'domain'
});

// --- Export Models and Sequelize Instance ---
// This allows other parts of your application (like controllers and models)
// to access the defined models and the database connection.
export {
    sequelize,
    User,
    Role,
    Permission,
    Department,
    Budget,
    TrainingDomain,
    BudgetAllocation
};