// controllers/approvalFlowController.js
const ApprovalFlow = require('../models/approvalFlowModel');

// @desc    Create a new approval flow
// @route   POST /api/approval-flows
exports.createApprovalFlow = async (req, res) => {
    const { name, approvers } = req.body;
    try {
        const approvalFlow = await ApprovalFlow.create({
            name,
            approvers,
            company: req.user.company,
        });
        res.status(201).json(approvalFlow);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all approval flows for a company
// @route   GET /api/approval-flows
exports.getApprovalFlows = async (req, res) => {
    try {
        const flows = await ApprovalFlow.find({ company: req.user.company });
        res.json(flows);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};