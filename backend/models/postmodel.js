const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  tags: [String],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
  commentCount: { type: Number, default: 0 },
  likeCount: { type: Number, default: 0 }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;




