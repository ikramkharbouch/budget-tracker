const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  googleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,  // It is optional, as users may not sign up with Google
  },
  appleId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: true,  // It is optional, as users may not sign up with Apple
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,  // It will be null if the user logs in via Google or Apple
  },
}, {
  sequelize,
  modelName: 'User',
  tableName: 'Users',
});

module.exports = User;
