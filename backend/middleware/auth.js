const jwt=require('jsonwebtoken'); 
const auth=async (req,res,next)=>{
    try{
        const token=req.header('Authorization')
        console.log(token);
        if(!token) return res.status(400).json({msg:'invalid Authoriazation at auth.js'});
        // console.log(jwt.verify(token,process.env.ACCESS_TOKEN_SECRET));
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
         if(err){
            return res.status(400).json({msg:"verification failed"})
         } 
        //  res.json({token});
         req.user=user
         next();
        })    
    } 
    catch(err){
        return res.status(500).json({msg:"error at auth"})
    } 
};      
module.exports={auth}  




