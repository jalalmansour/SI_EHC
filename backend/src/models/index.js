import sequelize from "../db.js";
import User from "./userModel.js";
import Role from "./roleModel.js";
import Permission from "./permissionModel.js";
import Department from "./departmentModel.js";
import TrainingBudget from "./trainingBudgetModel.js";

// User <-> Role
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });

// User <-> Department
User.belongsTo(Department, { foreignKey: "departmentId", as: "department" });
Department.hasMany(User, { foreignKey: "departmentId", as: "users" });

// Role <-> Permission
Role.belongsToMany(Permission, { through: "RolePermissions", as: "permissions" });
Permission.belongsToMany(Role, { through: "RolePermissions", as: "roles" });

// User <-> Permission (direct)
User.belongsToMany(Permission, { through: "UserPermissions", as: "directPermissions" });
Permission.belongsToMany(User, { through: "UserPermissions", as: "usersWithDirectPermission" });

// TrainingBudget associations
TrainingBudget.belongsTo(User, { foreignKey: "userId", as: "user" });
User.hasMany(TrainingBudget, { foreignKey: "userId", as: "trainingBudgets" });

TrainingBudget.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(TrainingBudget, { foreignKey: "roleId", as: "trainingBudgets" });

TrainingBudget.belongsTo(Department, { foreignKey: "departmentId", as: "department" });
Department.hasMany(TrainingBudget, { foreignKey: "departmentId", as: "trainingBudgets" });

export { sequelize, User, Role, Permission, Department, TrainingBudget };
