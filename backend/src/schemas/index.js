import { initUserModel } from "./User";
import { initRoleModel } from "./Role";
import { initVerificationTokenModel } from "./admin/verificationToken";
import { initPermissionModel } from "./Permission";
import { initDepartmentModel } from "./Department";
import {initTenantModel} from "./admin/tenant";
import {initTenantUserModel} from "./admin/tenantUser";
import {initEhcUserModel} from "./admin/ehcUser";

export const initTenantModels = (sequelize) => {
    const User = initUserModel(sequelize);
    const Role = initRoleModel(sequelize);
    const Permission = initPermissionModel(sequelize);
    const Department = initDepartmentModel(sequelize);

    // Tenant-specific Associations
    User.belongsTo(Role, { foreignKey: "roleId", as: "role" });
    Role.hasMany(User, { foreignKey: "roleId", as: "users" });

    Role.belongsToMany(Permission, { through: 'RolePermissions', as: 'permissions' });
    Permission.belongsToMany(Role, { through: 'RolePermissions', as: 'roles' });

    User.belongsToMany(Permission, { through: 'UserPermissions', as: 'directPermissions' });
    Permission.belongsToMany(User, { through: 'UserPermissions', as: 'usersWithDirectPermission' });

    User.belongsTo(Department, { foreignKey: "departmentId", as: "department" });
    Department.hasMany(User, { foreignKey: "departmentId", as: "users" });

    return { User, Role, Permission, Department };
};

export const initAdminModels = (sequelize) => {
    const Tenant = initTenantModel(sequelize);
    const TenantUser = initTenantUserModel(sequelize);
    const VerificationToken = initVerificationTokenModel(sequelize);
    const EhcUser = initEhcUserModel(sequelize);

    // Admin-specific Associations
    TenantUser.belongsTo(Tenant, { foreignKey: 'tenantId', as: 'tenant' });
    Tenant.hasMany(TenantUser, { foreignKey: 'tenantId', as: 'users' });

    TenantUser.hasMany(VerificationToken, {
        foreignKey: 'tenantUserId',
        as: 'verificationTokens'
    });

    VerificationToken.belongsTo(TenantUser, {
        foreignKey: "tenantUserId",
        as: "tenantUser"
    });

    return { Tenant, TenantUser, VerificationToken, EhcUser};
};