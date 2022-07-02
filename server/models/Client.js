const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        unique: true
    },
});

module.exports = mongoose.model('Client', ClientSchema)