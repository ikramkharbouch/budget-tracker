const express = require('express');
const { createFinance, getFinances } = require('../controllers/financeController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Finances
 *   description: Finance management
 */

/**
 * @swagger
 * /api/finances:
 *   post:
 *     summary: Create a new finance entry (income, expenses, or savings)
 *     tags: [Finances]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               income:
 *                 type: number
 *                 description: Monthly income
 *               expenses:
 *                 type: number
 *                 description: Monthly expenses
 *               luxuries:
 *                 type: number
 *                 description: Monthly luxuries spending
 *               total_balance:
 *                 type: number
 *                 description: Total balance (income - expenses - luxuries)
 *               savings:
 *                 type: number
 *                 description: Monthly savings
 *     responses:
 *       201:
 *         description: Finance entry created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createFinance);

/**
 * @swagger
 * /api/finances:
 *   get:
 *     summary: Get all finance entries
 *     tags: [Finances]
 *     responses:
 *       200:
 *         description: List of all finance entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   income:
 *                     type: number
 *                   expenses:
 *                     type: number
 *                   luxuries:
 *                     type: number
 *                   total_balance:
 *                     type: number
 *                   savings:
 *                     type: number
 */
router.get('/', getFinances);

module.exports = router;
