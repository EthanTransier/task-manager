const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.connect(process.env.MONGO_URI)

const Task = require('./models/task.js');
const tasksData = [
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
  {
    id: 11,
    name: "Task 11",
    description: "Description for Task 11",
    check: false
  },
  {
  id: 12,
    name: "Task 12",
    description: "Description for Task 12",
    check: false
  },
  {
    id: 13,
    name: "Task 13",
    description: "Description for Task 13",
    check: false
  },
  {
    id: 14,
    name: "Task 14",
    description: "Description for Task 14",
    check: false
  },
{
    id: 15,
    name: "Task 15",
    description: "Description for Task 15",
    check: false
  },
{
    id: 16,
    name: "Task 16",
    description: "Description for Task 16",
    check: false
  },
{
    id: 17,
    name: "Task 17",
    description: "Description for Task 17",
    check: false
  },
{
    id: 18,
    name: "Task 18",
    description: "Description for Task 18",
    check: false
  },
{
    id: 19,
    name: "Task 19",
    description: "Description for Task 19",
    check: false
  },
{
    id: 20,
    name: "Task 20",
    description: "Description for Task 20",
    check: false
  },
];

module.exports = {tasksData}

// async function test(){
//     for(let i=0; i<tasks.length; i++){
//         const insert = new task(tasks[i]);
//         await insert.save();
//     }
// } 


// test();