const Transaction = require('../models/Transaction');

// Create a new transaction
const createTransaction = async (req, res) => {
  const { user_id, amount, description, transaction_type, transaction_date } = req.body;
  try {
    const transaction = await Transaction.create({
      user_id, amount, description, transaction_type, transaction_date
    });
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all transactions
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { createTransaction, getTransactions };