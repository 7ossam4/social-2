const router = require("express").Router();
const auth = require("../middleware/auth");
const validateId = require("../middleware/validateId");
const comment = require("../controllers/comment.controller");

router.use(auth);

router.get("/:commentId", validateId("commentId"), comment.getComment);
router.patch("/:commentId", validateId("commentId"), comment.updateComment);
router.delete("/:commentId", validateId("commentId"), comment.deleteComment);

module.exports = router;
