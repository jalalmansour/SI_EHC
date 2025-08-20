// src/models/index.js
import sequelize from "../db"
import User from "./User";
import Role from "./Role";
import VerificationToken from "./verificationToken";
import Permission from "./permission";
import Department from "./department";

// Define associations AFTER importing both models

// User <-> Role
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });

// User <-> VerificationToken
User.hasMany(VerificationToken, { foreignKey: "userId", as: "verificationTokens"});
VerificationToken.belongsTo(User, { foreignKey: "userId", as: "user" });

// Role <-> Permission
Role.belongsToMany(Permission, { through: 'RolePermissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions' });

// User <-> Department
User.belongsTo(Department, { foreignKey: "departmentId", as: "department" });
Department.hasMany(User, { foreignKey: "departmentId", as: "users" });

export { sequelize, User, Role, VerificationToken, Permission, Department };
