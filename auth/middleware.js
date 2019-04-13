const jwt = require('jsonwebtoken');

function CheckToken(req,res,next){
    const authHeader = req.get('Authorization');
    if (authHeader){
        const token =authHeader.split(' ')[1];
        if (token){
            jwt.verify(token,process.env.TOKEN_SECRET,(err,hasil)=>{
                if (err){
                    const error = new Error ("JWT gagal"+err);
                    next(error);
                }
                else{
                    req.user=hasil
                    next();
                }
            })
        }
        else{
            next();
        }
    }
    else{
        next();
    }
}

function validateLogin(req,res,next){

    if (req.user){
        next();
    }
    else{
        const error = new Error ("Gak boleh masuk");
        res.status(403);
        next(error);
    }

}

module.exports={
    CheckToken,
    validateLogin
}