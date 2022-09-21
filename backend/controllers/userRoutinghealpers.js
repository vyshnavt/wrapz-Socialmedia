const userHelper=require("./userControl")
const jwt=require("jsonwebtoken")
require('dotenv').config()

module.exports={

    normalSignup : (req, res, next) => {
       userHelper.normalsignup(req.body).then(()=>{
        res.json({"responce":true})
       })
    },

    userlogin : (req,res)=>{
        const useremail=req.body.email
        const user={email:useremail}
        userHelper.userlogin(req.body).then((data)=>{ 
            if(data.status){
                if(data.user){
                    const accessToken = jwt.sign(user, process.env.Jwt_Access_Token)
                    console.log(accessToken);
                    res.json({token:accessToken,user:true,password:true})
                }else{
                    res.json({user:true,password:false})
                }
            }else{
                res.json({user:false})
            }
            
        })
    },

    userVerification:(req,res)=>{
        console.log("5555555");
        const token=req.headers.autherization.split(' ')[1]
        jwt.verify(token,process.env.Jwt_Access_Token,(err,user)=>{
            if(err) return res.json({user:false})
            res.json({user:true})
        })
    },

    userProfile  : (req,res)=>{
        console.log(req.headers);
        res.json({'jj':'hhhh'})
    }
    

}