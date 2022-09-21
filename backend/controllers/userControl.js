const db=require("../config/connection")
const constants = require("../config/constants")
const bcrypt= require('bcrypt')
const { userlogin } = require("./userRoutinghealpers")
const objectId=require('mongodb').ObjectId
module.exports ={
    
 normalsignup : (userdata)=>{
    return new Promise(async(resolve,reject)=>{
        userdata.password=await bcrypt.hash(userdata.password,10)
        db.get().collection(constants.NORMALUSER).insertOne(userdata).then(()=>{
            resolve()
        })
    })
 },

 userlogin:(logindata)=>{
    return new Promise((resolve,reject)=>{
        let responce={}
        db.get().collection(constants.NORMALUSER).findOne({email:logindata.email}).then((data)=>{
            if(data){
                bcrypt.compare(logindata.password,data.password).then((result)=>{
                    if(result){
                        responce.status=true
                        responce.user=data.name
                        responce.type=data.type
                        resolve(responce)
                    }
                    else{
                        responce.status=true
                        responce.user=false
                        resolve(responce)
                    }
                })
            }else{
                responce.status=false
                resolve(responce)
            }
        })
    })
}
 

}