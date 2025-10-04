// controllers/expenseController.js
const Expense = require('../models/expenseModel');
const ApprovalFlow = require('../models/approvalFlowModel');
const User = require('../models/userModel');

// @desc    Create a new expense claim
// @route   POST /api/expenses
exports.createExpense = async (req, res) => {
    const { amount, currency, category, description, date, approvalFlowId } = req.body;
    try {
        // Find the approval flow to determine the approvers
        const flow = await ApprovalFlow.findById(approvalFlowId);
        if (!flow) {
            return res.status(404).json({ message: 'Approval flow not found' });
        }
        
        const employee = await User.findById(req.user._id);

        const approvalSteps = [];
        for (const step of flow.approvers.sort((a,b) => a.level - b.level)) {
            let approverId;
            if (step.approverRole === 'manager' && employee.manager) {
                approverId = employee.manager;
            } else if (step.approverRole === 'specific_user' && step.specificApprover) {
                approverId = step.specificApprover;
            }
            
            if (approverId) {
                approvalSteps.push({ approver: approverId });
            }
        }

        if (approvalSteps.length === 0) {
            return res.status(400).json({ message: 'No valid approvers found for this expense.' });
        }

        const expense = await Expense.create({
            employee: req.user._id,
            company: req.user.company,
            amount, currency, category, description, date,
            approvalSteps: approvalSteps,
            currentApprover: approvalSteps[0].approver,
        });

        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get expenses submitted by the logged-in employee
// @route   GET /api/expenses/my
exports.getMyExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ employee: req.user._id })
            .populate('approvalSteps.approver', 'name email');
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get expenses waiting for the manager's approval
// @route   GET /api/expenses/pending
exports.getPendingApprovals = async (req, res) => {
    try {
        // Find expenses where the current user is the current approver
        const expenses = await Expense.find({
            currentApprover: req.user._id,
            status: 'pending',
        }).populate('employee', 'name email');
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Approve or reject an expense
// @route   PUT /api/expenses/:id/action
exports.processExpense = async (req, res) => {
    const { action, comments } = req.body; // action: 'approve' or 'reject'
    try {
        const expense = await Expense.findById(req.params.id);
        if (!expense) return res.status(404).json({ message: 'Expense not found' });
        
        // Check if the current user is the correct approver
        if (expense.currentApprover.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to perform this action' });
        }

        // Update the current approval step
        const currentStepIndex = expense.approvalSteps.findIndex(
            step => step.approver.toString() === req.user._id.toString() && step.status === 'pending'
        );

        if (action === 'reject') {
            expense.status = 'rejected';
            expense.approvalSteps[currentStepIndex].status = 'rejected';
            expense.currentApprover = undefined;
        } else { // 'approve'
            expense.approvalSteps[currentStepIndex].status = 'approved';

            // Check if there is a next approver
            if (currentStepIndex < expense.approvalSteps.length - 1) {
                expense.currentApprover = expense.approvalSteps[currentStepIndex + 1].approver;
            } else {
                // This was the last approver
                expense.status = 'approved';
                expense.currentApprover = undefined;
            }
        }
        
        expense.approvalSteps[currentStepIndex].comments = comments;
        expense.approvalSteps[currentStepIndex].approvedAt = Date.now();

        await expense.save();
        res.json(expense);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all company expenses (Admin only)
// @route   GET /api/expenses/all
exports.getAllCompanyExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ company: req.user.company })
            .populate('employee', 'name')
            .populate('approvalSteps.approver', 'name');
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};