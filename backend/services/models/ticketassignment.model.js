const mongoose = require('../utils/conn').mongoose;

const ticketAssignmentSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket",
        required: true,
    },
    agentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agent"
    },
    ticketStatus: {
        type: String,
        enum: ['active', 'inprogress', 'waiting', 'closed', 'resolved'] //closed - after the ticket is resolved then the ticket gets closed and no more changes can be made into it
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('ticketassignment', ticketAssignmentSchema);
