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
    },
    assigned: {
        type: Boolean,
        default: false,
        trim: true,
    },
    id: {
        type: Number,
        default: 0,
        trim: true,
    } 
}, {collection: 'task-manager'})

const task = mongoose.model('Task', TaskSchema) 

module.exports = task