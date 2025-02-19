const express = require('express');
const router = express.Router();
const postController = require('../controller/blogcontroller');
const {auth} = require('../middleware/auth');
const {createComment,getComments,createLike}=require('../controller/commentcontroller');
// Routes that don't require authentication
router.get("/", postController.getpost);

// Routes that require authentication
router.post('/post', auth, postController.createPost);
router.put('/updatepost/:id', auth, postController.editPost);
router.delete('/deletepost/:id', auth, postController.deletePost);
router.put('/comment/:id', auth, createComment);
router.post('/likes/:id', auth,createLike);
router.get('/comment/:id',auth,getComments);
module.exports = router;
  