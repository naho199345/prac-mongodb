const express = require("express");
const { Comment } = require("../models/Comments");
const { Blog } = require("../models/Blogs");
const { User } = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/comments", async (req, res) => {
  const blog = await Blog.find();
  return res.send({ blog });
});

router.get("/comment/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!mongoose.isValidObjectId(commentId)) {
      return res.status(400).send({ err: "invalid blogId" });
    }
    const comment = await Blog.findOne({ _id: commentId });
    return res.send({ comment });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ err: error.message });
  }
});

router.post("/comment", async (req, res) => {
  try {
  } catch (error) {
    console.error(error);
    return res.status(500).send({ err: error.message });
  }
});

router.delete("/comment/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!mongoose.isValidObjectId(commentId))
      return res.status(400).send({ err: "invalid blogId" });
    const comment = await Comment.findOneAndDelete({ _id: commentId });
    return res.send({ comment });
  } catch {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

router.put("/comment/:commentId", async (req, res) => {
  try {
    const { commentId } = req.params;
    if (!mongoose.isValidObjectId(commentId))
      return res.status(400).send({ err: "invalid blogId" });
  } catch {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;
