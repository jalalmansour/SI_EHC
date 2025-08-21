// src/models/index.js
import sequelize from "../db"
import User from "./User";
import EhcUser from "./master/ehcuser";
import Role from "./role";
import VerificationToken from "./verificationToken";
import Permission from "./permission";
import Department from "./department";
import Company from "./master/company";
import TenantInvite from "./master/tenantInvite";

// Define associations AFTER importing both models

// User <-> Role
User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
Role.hasMany(User, { foreignKey: "roleId", as: "users" });

// User <-> VerificationToken
User.hasMany(VerificationToken, { foreignKey: "userId", as: "verificationTokens"});
VerificationToken.belongsTo(User, { foreignKey: "userId", as: "user" });

// Role <-> Permission
Role.belongsToMany(Permission, { through: 'RolePermissions', as: 'permissions' });
Permission.belongsToMany(Role, { through: 'RolePermissions', as: 'roles' });

// User <-> Permission (Direct Permissions)
User.belongsToMany(Permission, {
    through: 'UserPermissions', // The name of the join table to be created
    as: 'directPermissions'     // A clear alias for your queries
});
Permission.belongsToMany(User, {
    through: 'UserPermissions',
    as: 'usersWithDirectPermission'
});

// User <-> Department
User.belongsTo(Department, { foreignKey: "departmentId", as: "department" });
Department.hasMany(User, { foreignKey: "departmentId", as: "users" });

// Company <-> Department
Department.belongsTo(Company, { foreignKey: 'companyId', as: 'company' });
Company.hasMany(Department, { foreignKey: 'companyId', as: 'departments' });

// Company <-> TenantInvite
TenantInvite.belongsTo(Company, { foreignKey: 'tenantId', as: 'company' });
Company.hasMany(TenantInvite, { foreignKey: 'tenantId', as: 'invites' });

export { sequelize, User, Role, VerificationToken, Permission, Department, EhcUser, Company, TenantInvite };
