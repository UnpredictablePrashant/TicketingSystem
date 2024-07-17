const mongoose = require('../utils/conn').mongoose;

const ticketSchema = new mongoose.Schema({
    generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    typeOfTicket: {
        type: String,
        enum: ['Query', 'Platform Issue', 'Others']
    },
    subject: {
        type: String
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('ticket', ticketSchema);
