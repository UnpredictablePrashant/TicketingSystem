const express = require('express');
const {
    assignTicket,
    getAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
} = require('../controllers/ticketassignment.controller');

const router = express.Router();

router.post('/', assignTicket);
router.get('/', getAssignments);
router.get('/:id', getAssignmentById);
router.put('/:id', updateAssignment);
router.delete('/:id', deleteAssignment);

module.exports = router;
