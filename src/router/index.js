const router = require("express").Router();
const userRouter = require("./users");
const blogRouter = require("./blogs");

router.use(userRouter);
router.use(blogRouter);

module.exports = router;
