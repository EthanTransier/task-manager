const mongoose = require('mongoose');

const connectDB = ()=>{
    // Remember this is temporary and needs to be replaces
    const connectString = "mongodb+srv://thisiscool:LZeQYzaagcQAcPM4@cluster0.qtvzvyj.mongodb.net/"

    mongoose.connect(connectString).
    then(()=>{
        console.log('database connected successfully')
    }).catch(err=>console.log(err))
}
module.exports = connectDB;