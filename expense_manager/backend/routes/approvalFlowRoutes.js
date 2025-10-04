// routes/approvalFlowRoutes.js
const express = require('express');
const router = express.Router();
const { createApprovalFlow, getApprovalFlows } = require('../controllers/approvalFlowController');
const { protect, isAdmin } = require('../middleware/authMiddleware');

router.use(protect, isAdmin);

router.route('/').post(createApprovalFlow).get(getApprovalFlows);

module.exports = router;