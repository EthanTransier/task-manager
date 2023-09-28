const Tasks = require('../models/task')
console.log(Tasks)

// Get Function for all Tasks
const readTasks = async(req,res) => {
    try {
        let answer = await Tasks.find({})
        console.log(answer)
        res.json(answer)
    }catch (e){
        console.log(e)
    }
}

// Post function for creating Tasks
// let length = Tasks.length+1;
const createTasks = async (req,res)=>{
    try{
        let answer = await Tasks.create(req.body)
        console.log(answer)
        res.json(answer)
    }catch (e){
        console.log(e)
    }
}

// Post function for update Tasks
const updateTasks = (req,res)=>{
    const {id} = req.params
    const {name, check, description} = req.body;
    // console.log('got request')
    // console.log(check)
    
    const task = Tasks.find((task) => task.id === Number(id))

    if(!task){
        return res.json({success:false, data:[]})
    }
    // console.log(desc)
    const newtasks = Tasks.map((task)=>{
        if(task.id === Number(id)){
            task.name = name;
            task.check = check;
            task.description = description;
        }
        return task
    })
    res.status(202).json({data: newtasks, success:true})
}

const deleteTask = (req,res)=>{
    const {id} = req.params
    const task = Tasks.find((task)=> task.id === Number(id))

    if(!task){
        return res.status(404).json({success:false, msgl:"No Matching ID Found"})
    }

    Tasks = Tasks.filter((task)=>{
        return task.id !== Number(id)
    })
    res.status(202).json({data:Tasks, success:true})
}

module.exports = {createTasks, readTasks, updateTasks, deleteTask}