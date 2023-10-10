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
    const currentPerson = await People.findOne({id:id})
    // const person = People.findOne({id:id})

    await People.findOneAndReplace(
        {id:id}, {name:name, age:age, id:id, task: currentPerson.task})

}

// Delete Functino for deleting tasks
const deletePerson = async(req,res)=>{
    const {id} = req.params
    await People.deleteOne({id: id})
}

const assignTask = async(req,res)=>{
    const {id} = req.params;
    const {currentTask} = req.body;
    const currentPerson = await People.findOne({id:id})
    var finalTask = ""
    if(currentTask == currentPerson.task){
        finalTask = currentPerson.task
    }else{
        finalTask = currentTask;
    }
    await People.findOneAndUpdate({id:id}, {task: finalTask})
    res.json("Already Includes Task")
}

const unassignTask = async(req,res)=>{
    const {id} = req.params;
    const currentPerson = await People.findOne({id:id})
    var finalTask = "None";
    await People.findOneAndUpdate({id:id}, {task: finalTask})
}



module.exports = {createPeople, readPeople, updatePeople, deletePerson, assignTask, unassignTask}