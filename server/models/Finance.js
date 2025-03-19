const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Finance = sequelize.define('Finance', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { type: DataTypes.UUID, allowNull: false },
  income: { type: DataTypes.FLOAT, allowNull: false },
  expenses: { type: DataTypes.FLOAT, allowNull: false },
  luxuries: { type: DataTypes.FLOAT, allowNull: false },
});

module.exports = Finance;
