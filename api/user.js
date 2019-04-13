const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const users = db.get('user');

router.get('/',(req,res,next)=>{
    res.json({
        message:"hello",
        id:req.user
    })
})

module.exports=router;