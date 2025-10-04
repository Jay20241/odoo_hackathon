// routes/expenseRoutes.js
const express = require('express');
const router = express.Router();
const {
    createExpense,
    getMyExpenses,
    getPendingApprovals,
    processExpense,
    getAllCompanyExpenses
} = require('../controllers/expenseController');
const { protect, isAdmin, isManager } = require('../middleware/authMiddleware');

router.route('/').post(protect, createExpense);
router.route('/my').get(protect, getMyExpenses);
router.route('/pending').get(protect, isManager, getPendingApprovals);
router.route('/all').get(protect, isAdmin, getAllCompanyExpenses);
router.route('/:id/action').put(protect, isManager, processExpense);

module.exports = router;