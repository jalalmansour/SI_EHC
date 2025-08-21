import { DataTypes } from "sequelize";
import sequelize from "../../db";

const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 100],
      notEmpty: true
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  db_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 50],
      is: /^[a-zA-Z0-9_]+$/i
    }
  },
  db_user: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 50]
    }
  },
  db_password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 100]
    }
  },
  db_host: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'localhost',
    validate: {
      notEmpty: true
    }
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'pending'),
    defaultValue: 'pending'
  },
  license_type: {
    type: DataTypes.ENUM('subscription', 'license'),
    defaultValue: 'subscription'
  },
  subscription_type: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['monthly', 'yearly', 'enterprise', 'trial', 'custom']]
    }
  },
  storage_limit_mb: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1024,
    validate: {
      min: 100,
      max: 1000000
    }
  },
  storage_used_mb: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
  ,
  owner_email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  provisioned_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  provisioned_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  provision_logs: {
    type: DataTypes.JSON,
    allowNull: true
  }
}, {
  tableName: 'Companies'
});

export default Company;
