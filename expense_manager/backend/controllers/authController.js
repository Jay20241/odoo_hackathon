// controllers/authController.js
const User = require('../models/userModel');
const Company = require('../models/companyModel');
const jwt = require('jsonwebtoken');
const { getCurrencyForCountry } = require('../utils/currencyService');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new company and admin user
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
    const { companyName, country, name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const currency = await getCurrencyForCountry(country);

        const company = await Company.create({ name: companyName, country, currency });

        const adminUser = await User.create({
            name,
            email,
            password,
            role: 'admin',
            company: company._id,
        });

        company.admin = adminUser._id;
        await company.save();

        res.status(201).json({
            _id: adminUser._id,
            name: adminUser.name,
            email: adminUser.email,
            role: adminUser.role,
            company: company,
            token: generateToken(adminUser._id),
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email }).populate('company');
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                company: user.company,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};