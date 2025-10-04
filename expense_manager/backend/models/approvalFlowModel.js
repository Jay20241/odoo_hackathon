// models/approvalFlowModel.js
const mongoose = require('mongoose');

const ApprovalFlowSchema = new mongoose.Schema({
    name: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
    // Defines an ordered list of approvers for sequential flow
    approvers: [{
        level: { type: Number, required: true },
        approverRole: { type: String, enum: ['manager', 'specific_user'], default: 'manager' },
        specificApprover: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Used if approverRole is 'specific_user'
    }],
    // Example for future conditional logic
    // ruleType: { type: String, enum: ['sequential', 'percentage'], default: 'sequential' }
}, { timestamps: true });

module.exports = mongoose.model('ApprovalFlow', ApprovalFlowSchema);