// server/models/index.js
const User = require('./User');
const Finance = require('./Finance');
const Transaction = require('./Transaction');
const Expense = require('./Expense');
const sequelize = require('../db');


User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

const syncDB = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Unable to sync database:', error);
  }
};

module.exports = {
  syncDB,
  User,
  Finance,
  Transaction,
  Expense
};