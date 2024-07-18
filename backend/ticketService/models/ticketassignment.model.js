const mongoose = require('../utils/conn').mongoose;

const ticketAssignmentSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ticket",
        required: true,
    },
    agentAssignment:[
        {
            agentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            ticketStatus:{
                type: String,
                default: 'assigned',
                enum: ['resolved','pending','escalated','assigned']
            },
            agentComment: {
                type: String
            },
            issueType: {
                type: String,
                enum: ['tech', 'product', 'sales']
            }
        }
    ],
    currentEscalationLevel: {
        type: String,
        default: 'l1',
        enum: ['l1','l2','l3','admin','cxo','others']
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
const TicketAssigment = mongoose.model("ticketassignment", ticketAssignmentSchema);
module.exports = { TicketAssigment };
