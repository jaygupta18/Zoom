const router=require('express').Router();
const {register,login,logout,corefreshtoken} = require('../controller/usercontroller');
router.post('/register',register); 
router.get('/refresh_token',corefreshtoken);
router.post('/login',login)
router.get('/logout',logout) 
module.exports=router;