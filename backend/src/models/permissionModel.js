import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Permission extends Model {}

Permission.init({
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
  sequelize,
  modelName: "Permission",
  tableName: "permissions",
  timestamps: true
});

export default Permission;
