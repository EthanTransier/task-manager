const mongoose = require('mongoose')
require('dotenv').config()
const Task = require('./models/task')
const Person = require('./models/person')
const tasksData = [
  {
    id: 1,
    name: "Task 1",
    description: "Description for Task 1",
    check: false,
    assigned: false
  },
  {
    id: 2,
    name: "Task 2",
    description: "Description for Task 2",
    check: false,
    assigned: false
  },
  {
    id: 3,
    name: "Task 3",
    description: "Description for Task 3",
    check: false,
    assigned: false
  },
  {
    id: 4,
    name: "Task 4",
    description: "Description for Task 4",
    check: false,
    assigned: false
  },
  {
    id: 5,
    name: "Task 5",
    description: "Description for Task 5",
    check: false,
    assigned: false
  },
  {
    id: 6,
    name: "Task 6",
    description: "Description for Task 6",
    check: false,
    assigned: false
  },
  {
    id: 7,
    name: "Task 7",
    description: "Description for Task 7",
    check: false,
    assigned: false
  },
  {
    id: 8,
    name: "Task 8",
    description: "Description for Task 8",
    check: false,
    assigned: false
  },
  {
    id: 9,
    name: "Task 9",
    description: "Description for Task 9",
    check: false,
    assigned: false
  },
  {
    id: 10,
    name: "Task 10",
    description: "Description for Task 10",
    check: false,
    assigned: false
  },
  {
    id: 11,
    name: "Task 11",
    description: "Description for Task 11",
    check: false,
    assigned: false
  },
  {
  id: 12,
    name: "Task 12",
    description: "Description for Task 12",
    check: false,
    assigned: false
  },
  {
    id: 13,
    name: "Task 13",
    description: "Description for Task 13",
    check: false,
    assigned: false
  },
  {
    id: 14,
    name: "Task 14",
    description: "Description for Task 14",
    check: false,
    assigned: false
  },
{
    id: 15,
    name: "Task 15",
    description: "Description for Task 15",
    check: false,
    assigned: false
  },
{
    id: 16,
    name: "Task 16",
    description: "Description for Task 16",
    check: false,
    assigned: false
  },
{
    id: 17,
    name: "Task 17",
    description: "Description for Task 17",
    check: false,
    assigned: false
  },
{
    id: 18,
    name: "Task 18",
    description: "Description for Task 18",
    check: false,
    assigned: false
  },
{
    id: 19,
    name: "Task 19",
    description: "Description for Task 19",
    check: false,
    assigned: false
  },
{
    id: 20,
    name: "Task 20",
    description: "Description for Task 20",
    check: false,
    assigned: false
  },
];
mongoose.connect(process.env.MONGO_URI)
// console.log(tasksData)
async function insertData(){
    // let names = ['Person 1', 'Person 2', 'Person 3', 'Person 4', 'Person 5']
    // let ages = [25, 22, 34, 89, 4]
    // let id = 1;
    // for(let i=0; i<5; i++){
    //     const person = new Person({
    //         "name": names[i],
    //         "age": ages[i],
    //         "id": id,
    //         "tasks": "none"
    //     })
    //     await person.validate()
    //     await person.save()
    //     id++
    // }

    for (let i = 0; i < tasksData.length; i++) { // Use tasksData instead of tasks
        const task = new Task(tasksData[i]);
        task.id = i+1; // Use Task instead of task
        await task.validate();
        await task.save();
    }
}

insertData();