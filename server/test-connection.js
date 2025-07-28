// test-connection.js
const sequelize = require('./db');

sequelize.authenticate()
  .then(() => console.log('✅ Connected successfully to budget_tracker!'))
  .catch(err => console.error('❌ Connection error:', err));
