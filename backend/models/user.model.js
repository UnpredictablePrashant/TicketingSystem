const mongoose = require('../utils/conn').mongoose;

const userSchema = new mongoose.Schema({
  name: {
        type: String
    },
  email: {
        type: String
    },
  phoneNo: {
        type: String
    },
  password: {
        type: String
  },
  status: {
        type: String,
        enum: ['online', 'offline']
  },
  createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('user', userSchema);
