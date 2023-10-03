const mongoose = require('mongoose')
require('dotenv').config()
const Task = require('./models/task')
const Person = require('./models/person')
const tasksData = require('./data')
mongoose.connect(process.env.MONGO_URI)

async function insertData(){
    // let names = ['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5']
    // let ages = [25, 22, 34, 89, 4]
    // let id = 1;
    // for(let i=0; i<5; i++){
    //     const person = new newPerson({
    //         "name": names[i],
    //         "age": ages[i],
    //         "id": id,
    //         "tasks": []
    //     })
    //     await person.validate()
    //     await person.save()
    //     id++
    // }

    for (let i = 0; i < tasksData.length; i++) { // Use tasksData instead of tasks
        const task = new Task(tasksData[i]); // Use Task instead of task
        await task.validate();
        await task.save();
    }
}

insertData();