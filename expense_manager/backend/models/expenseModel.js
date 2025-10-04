// models/expenseModel.js
const mongoose = require('mongoose');

const ApprovalStepSchema = new mongoose.Schema({
    approver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    comments: { type: String },
    approvedAt: { type: Date }
});

const ExpenseSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, uppercase: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    receiptUrl: { type: String }, // For OCR feature
    // Tracks the approval process
    approvalSteps: [ApprovalStepSchema],
    currentApprover: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Expense', ExpenseSchema);