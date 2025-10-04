// models/companyModel.js
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    currency: { type: String, required: true, uppercase: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);