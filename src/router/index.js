const router = require("express").Router();
const userRouter = require("./users");
const blogRouter = require("./blogs");
const commentRouter = require("./comments");

router.use(userRouter);
router.use(blogRouter);
router.use(commentRouter);

module.exports = router;
