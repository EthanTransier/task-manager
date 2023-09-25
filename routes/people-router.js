const express = require('express')
const router = express.Router();

// Below Here is to work with the router app

let {tasks} = require('../data')

router.get('/', (req, res)=>{
    res.json({succes:true, data:tasks})
})

router.post('/', (req, res)=>{
    console.log(req.body)
    const {name} = req.body;
    if(name){
        return res.status(201).json({succes:true, data:tasks})
    }
    res.status(404),json({succes:false, msg:'Please Provide a Name'})
})

router.put('/:id', (req, res) =>{
    const {id} = req.params
    const {name} = req.body
    const person = tasks.find((person) => person.id === Number(id))

    if(!person){
        return res.json({success:false, data:[]})
    }

    const newtasks = tasks.map((person)=>{
        if(person.id === Number(id)){
            person.name = name;
        }
        return person
    })
    res.status(202).json({data: newtasks, success:true})
})

router.delete('/:id', (req, res) =>{
    const {id} = req.params
    const person = tasks.find((person)=> person.id === Number(id))

    if(!person){
        return res.status(404).json({success:false, msgl:"No Matching ID Found"})
    }

    tasks = tasks.filter((person)=>{
        return person.id !== Number(id)
    })
    res.status(202).json({data:tasks, success:true})
})


module.exports = router;