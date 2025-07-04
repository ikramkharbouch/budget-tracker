// models/Expense.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./User");

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "Users",
        key: "id",
      },
    },
    groceries: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    restaurants: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    utilities: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    subscriptions: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    insurance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    vehicleCosts: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    housingPayment: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    luxuries: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    loan: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    carPayment: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    creditCardDebt: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    customExpenses: {
      type: DataTypes.JSONB,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  }
);

Expense.associate = (models) => {
  Expense.belongsTo(models.User, {
    foreignKey: "userId",
    onDelete: "CASCADE",
  });
};

module.exports = Expense;
