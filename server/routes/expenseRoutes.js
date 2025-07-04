const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Expense } = require('../models');
const expenseSchema = require('../validation/expenseValidator');  // Import the Zod schema
const { z } = require('zod');

/**
 * @swagger
 * tags:
 *   name: Expenses
 *   description: Expense management
 */

/**
 * @swagger
 * /api/expenses:
 *   post:
 *     summary: Create a new expense entry
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groceries:
 *                 type: number
 *               restaurants:
 *                 type: number
 *               utilities:
 *                 type: number
 *               subscriptions:
 *                 type: number
 *               insurance:
 *                 type: number
 *               vehicleCosts:
 *                 type: number
 *               housingPayment:
 *                 type: number
 *               luxuries:
 *                 type: number
 *               loan:
 *                 type: number
 *               carPayment:
 *                 type: number
 *               creditCardDebt:
 *                 type: number
 *               customExpenses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     amount:
 *                       type: number
 *     responses:
 *       201:
 *         description: Expense created successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', auth, async (req, res) => {
  try {
    const validatedExpense = expenseSchema.parse(req.body);

    const newExpense = await Expense.create({
      userId: req.user.id,
      ...validatedExpense,
    });

    res.status(201).json(newExpense);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }
    console.error('Error creating expense:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses for authenticated user
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of expenses
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    
    res.json(expenses);
  } catch (err) {
    console.error('Error fetching expenses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/expenses/{id}:
 *   get:
 *     summary: Get expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Expense data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.json(expense);
  } catch (err) {
    console.error('Error fetching expense:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/expenses/{id}:
 *   put:
 *     summary: Update an expense
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groceries:
 *                 type: number
 *               restaurants:
 *                 type: number
 *               utilities:
 *                 type: number
 *               subscriptions:
 *                 type: number
 *               insurance:
 *                 type: number
 *               vehicleCosts:
 *                 type: number
 *               housingPayment:
 *                 type: number
 *               luxuries:
 *                 type: number
 *               loan:
 *                 type: number
 *               carPayment:
 *                 type: number
 *               creditCardDebt:
 *                 type: number
 *               customExpenses:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     amount:
 *                       type: number
 *     responses:
 *       200:
 *         description: Expense updated successfully
 *       400:
 *         description: Invalid data
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.userId !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const validatedExpense = expenseSchema.parse(req.body);

    await expense.update(validatedExpense);

    res.status(200).json(expense);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation failed', errors: err.errors });
    }
    console.error('Error updating expense:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/expenses/{id}:
 *   delete:
 *     summary: Delete an expense by ID
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the expense to delete
 *     responses:
 *       200:
 *         description: Expense deleted successfully
 *       404:
 *         description: Expense not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', auth, async (req, res) => {
    try {
      const expense = await Expense.findOne({ where: { id: req.params.id, userId: req.user.id } });
  
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found' });
      }
  
      await expense.destroy();
      res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
      console.error('Error deleting expense:', err);
      res.status(500).json({ message: 'Server error' });
    }
  });
    

module.exports = router;