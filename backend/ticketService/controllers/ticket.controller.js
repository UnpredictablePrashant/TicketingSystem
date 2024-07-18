const { Ticket } = require('../models/ticket.model');
const { Kafka } = require('kafkajs');
const redisClient = require('../utils/redis');


const kafka = new Kafka({
    clientId: 'ticket-system',
    brokers: ['localhost:9092']
});
const producer = kafka.producer();

const createTicket = async (req, res) => {
    try {
        const ticket = new Ticket(req.body);
        await ticket.save();
        await producer.connect();
        await producer.send({
            topic: 'ticket-creation',
            messages: [
                { value: JSON.stringify(ticket) }
            ]
        });

        res.status(201).json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate('generatedBy');
        res.status(200).json(tickets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('generatedBy');
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
};
