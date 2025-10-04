// controllers/userController.js
const User = require('../models/userModel');

// @desc    Create a new user (employee or manager)
// @route   POST /api/users
exports.createUser = async (req, res) => {
    const { name, email, password, role, managerId } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            company: req.user.company, // Admin's company
            manager: managerId,
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all users in the admin's company
// @route   GET /api/users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({ company: req.user.company });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};