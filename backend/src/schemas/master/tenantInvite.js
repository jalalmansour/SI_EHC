import { DataTypes } from "sequelize";
import sequelize from "../../db";

const TenantInvite = sequelize.define("TenantInvite", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tenantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Companies',
      key: 'id'
    }
  },
  inviteEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { isEmail: true },
  },
  tokenHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  used: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  usedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  meta: {
    type: DataTypes.JSON,
    allowNull: true,
  }
}, {
  tableName: 'tenant_invites',
});

export default TenantInvite;
