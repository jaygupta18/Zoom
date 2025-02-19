 const Users =require('../models/usermodel');
 const bcyrpt=require('bcrypt') 
 const jwt=require('jsonwebtoken') 
 const createAccessToken=(payload)=>{
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1d'})  
  }      
   
 const corefreshtoken = async (req, res) => {
        try { 
          const rf = req.cookies.refreshtoken;
          // console.log(rf);
          if (!rf) {
            return res.status(400).json({ msg: "Please login or register now" });
          } 
           
          const decode =jwt.decode(rf);
          // console.log(decode);
          // const 
          const user=await Users.findById(decode.id);
          if(user){
            const accessToken = createAccessToken({ id: user._id });
              res.json({accessToken });
          } 
        } catch (err) {
          console.error(err);
          res.status(500).json({ msg: "Error at corefreshtoken" });
        }
      };
        
  
 const createRefreshToken=(payload)=>{
    return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'},{algorithm: 'HS256'})
 }   

  const  register=async(req,res)=>{
        try{
            
             const {name,email,password}=req.body 
             const user=await Users.findOne({email})
             if(user)return res.status(400).json({msg:"already registered"}) 
             if(password.length<6) return res.status(400).json({msg:"password must be greater than 6 characters"})
             const passwordHash=await bcyrpt.hash(password,10) 
            const newUser=new Users({
            name,email,password:passwordHash
        })
        console.log(newUser);
        await newUser.save();
        const accesstoken=createAccessToken({id:newUser._id})
        const refreshtoken=createRefreshToken({id:newUser._id})
        res.cookie('refreshtoken',refreshtoken,{
            httpOnly:true,
            path:'/user/refresh_token',
           

        })  
        res.json(accesstoken) 
        }           
        catch(err){
            console.log(err);
            return res.status(400).json({msg:err.message});
        } 
    }  
     const login=async (req,res)=>{
        try{
              const {email,password}=req.body;
              const user= await Users.findOne({email})
              if(!user){
                return res.status(400).json({msg:"user is not registered"})
              }
              const ismatch=await bcyrpt.compare(password,user.password)
              if(!ismatch){
                return res.status(400).json({msg:"incorrect password "})
              }  
              const accesstoken=createAccessToken({id:user._id})
              const refreshtoken=createAccessToken({id:user._id}) 
              res.cookie('refreshtoken',refreshtoken,{
                httpOnly:true,
                path:'/user/refresh_token',
                
    
            })  
              res.json(accesstoken)
        } 
        catch(err){
             return res.status(500).json({msg:"error at login"})
        }
     }           
     const logout=async (req,res)=>{
               try{
                      res.clearCookie('refreshtoken',{path:'/user/refresh_token'}) 
                      return res.json({msg:"logout successfully"})
               }
               catch(err){
                res.json({msg:"error at logout "});
               } 
     }       
     module.exports={register,login,logout,corefreshtoken};

     