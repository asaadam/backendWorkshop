const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const users = db.get('user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
users.createIndex('username', { unique: true });



router.post('/login',async (req,res,next)=>{
    const username = req.body.username;
    try{
        const user = await users.findOne({username});
        if (user){
            bcrypt.compare(req.body.password,user.password,(err,hasil)=>{
                if (err){
                    const error = new Error("Bcrypt gagal"+err);
                    next(error);
                }
                else{
                    if (hasil){
                        const payload ={
                            id:user._id
                        }
                        jwt.sign(payload,process.env.TOKEN_SECRET,(err,token)=>{
             
                            if (err){
                                const error = new Error ("Json gagal");
                                next(error);
                            }
                            else{
                               res.json({
                                   token
                               })
                            }
                        })
                    }
                    else{
                        const error = new Error ("Password Salah");
                        res.status('401');
                        next(error);
                    }
                    
                }
            })
        }
        else{
            const error = new Error ("Username tidak ditermukan");
            res.status(401);
            next(error);
        }
    }
    catch(err){
        const error = new Error ("Kesalah mencari username "+err);
        next(error);
    }
})


router.post('/register', async (req, res, next) => {
    const username = req.body.username;
    try {
        const check = await users.findOne({ username });
        if (check) {
            const error = new Error("Username sudah ada");
            res.status(409);
            next(error);
        }
        else {
            bcrypt.hash(req.body.password, 12, (err, hash) => {
                if (err) {
                    const error = new Error("Bcrypt gagal" + err);
                    next(error);
                }
                else {
                    const user = {
                        username: req.body.username,
                        password: hash
                    }
                    users.insert(user);
                    res.json({
                        message:"user telah berhasil dibuat"
                    })

                }
            })

        }
    }
    catch(err){
        const error = new Error("Mencari username salah"+err);
        next(error);
    }

});


module.exports = router;