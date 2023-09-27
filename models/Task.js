const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        trim: true,
    },
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

const task = mongoose.model('Task', TaskSchema) 

module.exports = task