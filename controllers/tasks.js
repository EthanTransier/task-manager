const Tasks = require('../models/task')

// Get Function for all Tasks
const readTasks = async(req,res) => {
    try {
        let answer = await Tasks.find({})
        res.json(answer)
    }catch (e){
        console.log(e)
    }
}

// Post function for creating Tasks
const createTasks = async (req,res)=>{
    try{
        let answer = await Tasks.create(req.body)
        res.json(answer)
    }catch (e){
        console.log(e)
    }
}

// Put function for update Tasks
const updateTasks = async(req,res)=>{
    const {id} = req.params
    const currentTask = await Tasks.findOne({id:id})
    const {name, description} = req.body;

    await Tasks.findOneAndReplace(
        {id:id}, {name:name, description:description, check:currentTask.check, assigned: currentTask.assigned, id:id},)

}

// Delete Functino for deleting tasks
const deleteTask = async(req,res)=>{
    const {id} = req.params
    await Tasks.deleteOne({id: id})
}

// const deleteManyTask = async(req,res)=>{
//     // const {id} = req.params

//     for(let i = 0; i < tasks.length; i++){
//         await Tasks.deleteOne({check: false})
//     }
    
// }


// const assignTask = async(req,res)=>{

// }

module.exports = {createTasks, readTasks, updateTasks, deleteTask}