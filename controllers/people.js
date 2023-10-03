const People = require('../models/person')

// Get Function for all Tasks
const readPeople = async(req,res) => {
    try {
        let answer = await People.find({})
        res.json(answer)
    }catch (e){
        console.log(e)
    }
}

// Post function for creating Tasks
const createPeople = async (req,res)=>{
    try{
        let answer = await People.create(req.body)
        res.json(answer)
    }catch (e){
        console.log(e)
    }
}

// Put function for update Tasks
const updatePeople = async(req,res)=>{
    const {id} = req.params
    const {name, age} = req.body;

    const person = People.findOne({_id:id})

    await People.findOneAndReplace(
        {_id:id}, {name:name, age:age, id:person.id})

}

// Delete Functino for deleting tasks
const deletePerson = async(req,res)=>{
    const {id} = req.params
    await People.deleteOne({_id: id})
}

const assignTask = async(req,res)=>{
    const {id} = req.params;
    const {currentTask} = req.body;
    const currentPerson = await People.findOne({id:id})
    console.log(id)
    const currentTasks = currentPerson.tasks;
    if(!currentTasks.includes(currentTask)){
        currentTasks.push(currentTask)
        for(let i = 0; i < currentTasks.length; i++){
            if(currentTasks[i] == "" || currentTasks[i] == null){
                currentTasks.splice(i, 1)
            }
        }
    }
    await People.findOneAndUpdate({id:id}, {tasks: currentTasks})
    res.json("Already Includes Task")
}

const unassignTask = async(req,res)=>{
    const {id} = req.params;
    const {currentTask} = req.body;
    const currentPerson = await People.findOne({id:id})
    console.log(id)
    const currentTasks = currentPerson.tasks;
    if(currentTasks.includes(currentTask)){
        const index = currentTasks.indexOf(currentTask)
        currentTasks.splice(index, 1)
        for(let i = 0; i < currentTasks.length; i++){
            if(currentTasks[i] == "" || currentTasks[i] == null){
                currentTasks.splice(i, 1)
            }
        }
    }
    await People.findOneAndUpdate({id:id}, {tasks: currentTasks})
    res.json("Already Includes Task")
}



module.exports = {createPeople, readPeople, updatePeople, deletePerson, assignTask, unassignTask}