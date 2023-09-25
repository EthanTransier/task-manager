const express = require('express');
const router = express.Router();

router.post("/", (req, res)=>{
    console.log(req.body)
    const {name} = req.body;
    if(name == "Bernard"){
        return res.json({status:200, data:name});
    }
    res.send("Please Provide Credentials")
})

module.exports = router