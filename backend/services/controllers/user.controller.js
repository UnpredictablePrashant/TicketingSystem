const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwtAuth');
const mongoose = require('../utils/conn').mongoose;

const saltRounds = 10;

// Create new user
exports.createUser = async (req, res) => {
    try {
        const { name, email, phoneNo, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ name, email, phoneNo, password: hashedPassword });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user by ID
exports.updateUser = async (req, res) => {
    try {
        const { name, email, phoneNo, password, status } = req.body;
        const updateData = { name, email, phoneNo, status };

        if (password) {
            updateData.password = await bcrypt.hash(password, saltRounds);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete user by ID
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.jwtTokenGenerator(email);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
