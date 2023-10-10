const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    check: {
        type: Boolean,
        default: false,
        trim: true,
    } 
}, {collection: 'task-manager'})

const Task = mongoose.model('Task', TaskSchema) 

module.exports = Task