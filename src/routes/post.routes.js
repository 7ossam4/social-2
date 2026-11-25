const router = require("express").Router();
const auth = require("../middleware/auth");
const validateId = require("../middleware/validateId");
const post = require("../controllers/post.controller");
const comment = require("../controllers/comment.controller");

router.use(auth);

router.post("/", post.createPost);
router.get("/", post.getMyPosts);
router.get("/:postId", validateId("postId"), post.getPost);
router.patch("/:postId", validateId("postId"), post.updatePost);
router.delete("/:postId", validateId("postId"), post.deletePost);

router.post("/:postId/comments", validateId("postId"), comment.createComment);
router.get("/:postId/comments", validateId("postId"), comment.getPostComments);

module.exports = router;
