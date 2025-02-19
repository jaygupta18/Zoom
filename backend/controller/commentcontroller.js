
const Post = require('../models/postmodel');
const Comment = require('../models/comments');
const Like = require('../models/likes');
// const { createPost } = require('./blogcontroller');
createComment = async(req,res,next) => {
    const postId = req.params.id;
    const {content}= req.body;
    console.log(content);
    console.log(req.body); 
    if (!req.body || typeof req.body !== 'object') {
     return res.status(400).json({ msg: 'Invalid request body' });
    } 
      const comment = new Comment({
       content: req.body.content,
       UserId:req.user.id,
       postId: postId
     });
       
     try {
       const post = await Post.findById(postId);
       if (!post) {
         return res.status(404).json({ msg: "Post not found" });
       }
       const savedComment = await comment.save();
       post.comments.push(savedComment._id);
       await post.save();
       res.json({ msg: "Comment created successfully" });
     } catch (err) {
       res.status(400).json({ msg: err.message });
     }
   }; 
 
  getComments = async(req, res) => {
     const postId = req.params.id;
     try {
       const post = await Post.findById(postId);
       if (!post) {
         return res.status(404).json({ msg: "Post not found" });
       }
       const comments = await Comment.find({postId}).populate('content');
       console.log(comments);
       res.send(comments);
     } catch (err) {
       res.status(400).json({ msg: err.message });
     }
   };
 
 createLike = (req, res) => {
   const like = new Like({
     post: req.params.id,
     user: req.user._id
   });
   like.save((err, like) => {
     if (err) {
       res.status(400).send(err);
     } else {
       Post.findByIdAndUpdate(req.params.id, { $inc: { likeCount: 1 } }, (err, post) => {
         if (err) {
           res.status(400).send(err);
         } else {
           res.send(like);
         }
       });
     }
   });
 };

 module.exports={createLike,createComment,getComments};
 