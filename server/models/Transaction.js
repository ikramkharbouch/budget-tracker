const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
  transaction_type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['income', 'expense', 'luxury', 'bill']],
    },
  },
  transaction_date: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  tableName: 'transactions',
  timestamps: false,
});

Transaction.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Transaction;
