const db = require("../utils/conn");
const mongoose = require("../utils/conn").mongoose;

const ticketSchema = mongoose.Schema({
  generatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    typeOfTicket: {
        type: String,
        enum: ['Query', 'Tech Issue', 'Order issue', 'Others']
    },
    subject: {
        type: String
    },
    image: [
        {
            type: String
        }
    ],
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const Ticket = mongoose.model("ticket", ticketSchema);
module.exports = { Ticket };
