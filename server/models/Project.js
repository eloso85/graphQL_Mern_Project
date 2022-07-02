const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    name:{
        type: String
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed']
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,//when you creat a new record it will get assigned a under score id and it releated to another model with ref. 
        ref:'Client'
    }
});

module.exports = mongoose.model('Project', ProjectSchema)