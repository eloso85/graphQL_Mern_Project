const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
    // unique: true,
    
  },
  email: {
    type: String,
    

  },
  phone: {
    type: String,
    
  },
});

module.exports = mongoose.model('Client', ClientSchema);