const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URI)

const task = require('./models/task.js');
const tasks = [
  {
    id: 1,
    name: "Task 1",
    description: "Description for Task 1",
    check: false
  },
  {
    id: 2,
    name: "Task 2",
    description: "Description for Task 2",
    check: false
  },
  {
    id: 3,
    name: "Task 3",
    description: "Description for Task 3",
    check: false
  },
  {
    id: 4,
    name: "Task 4",
    description: "Description for Task 4",
    check: false
  },
  {
    id: 5,
    name: "Task 5",
    description: "Description for Task 5",
    check: false
  },
  {
    id: 6,
    name: "Task 6",
    description: "Description for Task 6",
    check: false
  },
  {
    id: 7,
    name: "Task 7",
    description: "Description for Task 7",
    check: false
  },
  {
    id: 8,
    name: "Task 8",
    description: "Description for Task 8",
    check: false
  },
  {
    id: 9,
    name: "Task 9",
    description: "Description for Task 9",
    check: false
  },
  {
    id: 10,
    name: "Task 10",
    description: "Description for Task 10",
    check: false
  },
];

// async function test(){
//     for(let i=0; i<tasks.length; i++){
//         const insert = new task(tasks[i]);
//         await insert.save();
//     }
// } 


// test();