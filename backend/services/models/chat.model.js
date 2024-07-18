const mongoose = require('../utils/conn').mongoose;


const chatMessageSchema = new mongoose.Schema({
  ticketId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ticket' 
    },
  ticketAssignmentId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'ticketassignment' 
  },
  sender: { 
        type: String, 
        enum: ['agent', 'customer'] 
    },
  message: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('chatmessage', chatMessageSchema);
