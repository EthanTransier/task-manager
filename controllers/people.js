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

    await People.findOneAndReplace(
        {_id:id}, {name:name, age:age})

}

// Delete Functino for deleting tasks
const deletePerson = async(req,res)=>{
    const {id} = req.params
    await People.deleteOne({_id: id})
}

const assignTask = async(req,res)=>{

}

module.exports = {createPeople, readPeople, updatePeople, deletePerson, assignTask}