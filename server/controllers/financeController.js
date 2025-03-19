const Finance = require('../models/Finance');

// Create a new finance record
const createFinance = async (req, res) => {
  const { user_id, income, expenses, luxuries, bills } = req.body;
  try {
    const finance = await Finance.create({ user_id, income, expenses, luxuries, bills });
    res.status(201).json(finance);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all finance records
const getFinances = async (req, res) => {
  try {
    const finances = await Finance.findAll();
    res.status(200).json(finances);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createFinance, getFinances };