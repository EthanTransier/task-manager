const express = require('express');
const app = express();

// require('dotenv').config();
const connectDB = require('./db/connect')
const morgan = require('morgan')
const people = require('./routes/people-controller')
const auth = require('./routes/auth');
const connectDB = require('./db/connect');

app.use(express.static('./public'))
// Parse form data

app.use(express.urlencoded({ extended: false}));

connectDB()

app.use(express.json())

app.use('/api/people', people)
app.use('/login', auth)

const serverInit = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(7000, ()=>{
            console.log('Server is listening at Port 7000')
        })
    } catch(error){
        console.log(error)
    }
}


serverInit()