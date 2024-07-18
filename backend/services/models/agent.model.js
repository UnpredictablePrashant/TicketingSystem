const mongoose = require('../utils/conn').mongoose;

const agentSchema = new mongoose.Schema({
  name: {
        type: String
    },
  email: {
        type: String
    },
  password: {
        type: String
    },
  createdAt: {
        type: Date,
        default: Date.now()
    },
  status: {
        type: String,
        enum: ['available', 'busy', 'offline'],
        default: 'offline'
    }
});

module.exports = mongoose.model('agent', agentSchema);
