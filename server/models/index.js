const sequelize = require('../db');
const User = require('./User');
const Finance = require('./Finance');

User.hasMany(Finance, { foreignKey: 'userId' });
Finance.belongsTo(User, { foreignKey: 'userId' });

const syncDB = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Database synced successfully.');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

module.exports = { User, Finance, syncDB };