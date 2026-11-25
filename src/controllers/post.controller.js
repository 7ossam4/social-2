const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

exports.createPost = async (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Content is required" });
  }
  const post = await Post.create({ author: req.user.id, content });
  res.status(201).json({ message: "Post created", post });
};

exports.getMyPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user.id }).sort({ createdAt: -1 });
  res.json({ count: posts.length, posts });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.postId).populate("author", "name email");
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json({ post });
};

exports.updatePost = async (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Content is required" });
  }
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Only the post owner can update this post" });
  }
  post.content = content;
  await post.save();
  res.json({ message: "Post updated", post });
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });
  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Only the post owner can delete this post" });
  }
  await Comment.deleteMany({ post: post._id });
  await post.deleteOne();
  res.json({ message: "Post and its comments deleted" });
};
