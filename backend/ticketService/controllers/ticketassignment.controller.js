const { TicketAssigment } = require('../models/ticketassignment.model');
const { Kafka } = require('kafkajs');
const redisClient = require('../utils/redis');


const kafka = new Kafka({
    clientId: 'ticket-system',
    brokers: ['localhost:9092']
});
const producer = kafka.producer();

const assignTicket = async (req, res) => {
    try {
        const ticketAssignment = new TicketAssigment(req.body);
        await ticketAssignment.save();
        
        await producer.connect();
        await producer.send({
            topic: 'ticket-assignment',
            messages: [
                { value: JSON.stringify(ticketAssignment) }
            ]
        });

        res.status(201).json(ticketAssignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAssignments = async (req, res) => {
    try {
        const assignments = await TicketAssigment.find().populate('ticketId agentAssignment.agentId');
        res.status(200).json(assignments);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAssignmentById = async (req, res) => {
    try {
        const assignment = await TicketAssigment.findById(req.params.id).populate('ticketId agentAssignment.agentId');
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateAssignment = async (req, res) => {
    try {
        const assignment = await TicketAssigment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        res.status(200).json(assignment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteAssignment = async (req, res) => {
    try {
        const assignment = await TicketAssigment.findByIdAndDelete(req.params.id);
        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    assignTicket,
    getAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
};
