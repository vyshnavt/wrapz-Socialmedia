const jwt=require("jsonwebtoken")
require('dotenv').config()

module.exports={

    jwtautenticate:(req,res,next)=>{
  
        const authtoken = req.headers.autherization.split(' ')[1]
        if (authtoken == null) return res.sendStatus(401)
        jwt.verify(authtoken, process.env.Jwt_Access_Token,(err, user)=>{
            if (err) return res.sendStatus(403)
            next()
        })
    }
}