let {tasks} = require('../data.js');

// Get Function for all people
const readPeople = (req,res) => {
    res.json({success: true, data:tasks})
}

// Post function for creating people
let length = tasks.length+1;
const createPeople = (req,res)=>{
    const {name,id} = req.body;

    if(!name){
        return res.status(400).json({data:[], success:false, msg: 'Please enter a name'})
    }

    let person = {id:length++, name:name}
    tasks.push(person)
    res.status(201).json({success:true, data:[people]})
}

// Post function for update people
const updatePeople = (req,res)=>{
    const {id} = req.params
    const {name, check, description} = req.body;
    // console.log('got request')
    // console.log(check)
    
    const person = tasks.find((person) => person.id === Number(id))

    if(!person){
        return res.json({success:false, data:[]})
    }
    // console.log(desc)
    const newtasks = tasks.map((person)=>{
        if(person.id === Number(id)){
            person.name = name;
            person.check = check;
            person.description = description;
        }
        return person
    })
    res.status(202).json({data: newtasks, success:true})
}

const deletePerson = (req,res)=>{
    const {id} = req.params
    const person = tasks.find((person)=> person.id === Number(id))

    if(!person){
        return res.status(404).json({success:false, msgl:"No Matching ID Found"})
    }

    tasks = tasks.filter((person)=>{
        return person.id !== Number(id)
    })
    res.status(202).json({data:tasks, success:true})
}

module.exports = {createPeople, readPeople, updatePeople, deletePerson}