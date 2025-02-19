const Post = require('../models/postmodel');
const Comment = require('../models/comments');
const Like = require('../models/likes');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

// Add this middleware to parse JSON request bodies
app.use(bodyParser.json());
exports.createPost = async (req, res) => {
  const post = new Post(req.body);
  // console.log(req.body);
  if(!post.title)return res.json({msg:"give a title to your post"});
  try{
    await post.save();
    res.json({msg:"post created successfully"});
  }
  catch(err){
    res.json({msg:err.message});
  }
};  

exports.editPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json({ msg: "Post updated successfully" });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

exports.deletePost = async (req, res) => {
 await  Post.findByIdAndDelete(req.params.id);
 res.json({msg:"successfully deleted"});
};
exports.getpost=async(req,res)=>{
    const posts= await Post.find();
    if(posts){
        res.send(posts);
    }
    else{
        return res.json({msg:"create posts "});
    }
};
