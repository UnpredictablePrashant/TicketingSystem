const express = require('express');
const {
    createTicket,
    getTickets,
    getTicketById,
    updateTicket,
    deleteTicket
} = require('../controllers/ticket.controller');

const router = express.Router();

router.post('/', createTicket);
router.get('/', getTickets);
router.get('/:id', getTicketById);
router.put('/:id', updateTicket);
router.delete('/:id', deleteTicket);

module.exports = router;
