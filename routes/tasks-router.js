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
    const {name, check} = req.body;
    console.log('got request')
    // console.log(check)
    
    const task = tasks.find((task) => task.id === Number(id))

    if(!task){
        return res.json({success:false, data:[]})
    }

    const newtasks = tasks.map((task)=>{
        if(task.id === Number(id)){
            task.name = name;
        }
        if(check){
            task.check = check;
        }
        return task
    })
    res.status(202).json({data: newtasks, success:true})
})

router.delete('/:id', (req, res) =>{
    const {id} = req.params
    const task = tasks.find((task)=> task.id === Number(id))

    if(!task){
        return res.status(404).json({success:false, msgl:"No Matching ID Found"})
    }

    tasks = tasks.filter((task)=>{
        return task.id !== Number(id)
    })
    res.status(202).json({data:tasks, success:true})
})


module.exports = router;