const Agent = require('../models/agent.model');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwtAuth');
const mongoose = require('../utils/conn').mongoose;

const saltRounds = 10;

exports.createAgent = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newAgent = new Agent({ name, email, password: hashedPassword });
        await newAgent.save();

        res.status(201).json(newAgent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find();
        res.status(200).json(agents);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAgentById = async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id);
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.status(200).json(agent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAgent = async (req, res) => {
    try {
        const { name, email, password, status } = req.body;
        const updateData = { name, email, status };

        if (password) {
            updateData.password = await bcrypt.hash(password, saltRounds);
        }

        const updatedAgent = await Agent.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!updatedAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        res.status(200).json(updatedAgent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAgent = async (req, res) => {
    try {
        const agent = await Agent.findByIdAndDelete(req.params.id);
        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        res.status(200).json({ message: 'Agent deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginAgent = async (req, res) => {
    try {
        const { email, password } = req.body;
        const agent = await Agent.findOne({ email });

        if (!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }

        const isMatch = await bcrypt.compare(password, agent.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.jwtTokenGenerator(email);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
