const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

exports.createComment = async (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Content is required" });
  }
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const comment = await Comment.create({
    post: post._id,
    author: req.user.id,
    content,
  });
  res.status(201).json({ message: "Comment added", comment });
};

exports.getPostComments = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const comments = await Comment.find({ post: post._id })
    .sort({ createdAt: 1 })
    .populate("author", "name");
  res.json({ count: comments.length, comments });
};

exports.getComment = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId).populate("author", "name");
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  res.json({ comment });
};

exports.updateComment = async (req, res) => {
  const { content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ message: "Content is required" });
  }
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });
  if (comment.author.toString() !== req.user.id) {
    return res.status(403).json({ message: "Only the comment owner can update this comment" });
  }
  comment.content = content;
  await comment.save();
  res.json({ message: "Comment updated", comment });
};

exports.deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  const post = await Post.findById(comment.post);
  const isCommentOwner = comment.author.toString() === req.user.id;
  const isPostOwner = post && post.author.toString() === req.user.id;

  if (!isCommentOwner && !isPostOwner) {
    return res
      .status(403)
      .json({ message: "Only the comment owner or the post owner can delete this comment" });
  }
  await comment.deleteOne();
  res.json({ message: "Comment deleted" });
};
