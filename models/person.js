const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true,'Must provide a name'],
        trim: true,
        maxLength: [20, "The name can't excess 20 characters"]
    },
    age:{
        type:Number,
        default:5
    }
})

modules.exports = mongoose.model('Person', personSchema)
model.find({complete:true})