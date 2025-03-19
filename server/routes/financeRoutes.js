const express = require('express');
const { createFinance, getFinances } = require('../controllers/financeController');
const router = express.Router();

router.post('/', createFinance);
router.get('/', getFinances);

module.exports = router;
