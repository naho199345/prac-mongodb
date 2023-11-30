const express = require("express");
const { Blog } = require("../models/Blogs");
const { User } = require("../models/User");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/blogs", async (req, res) => {
  const blog = await Blog.find();
  return res.send({ blog });
});

router.get("/blog/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!mongoose.isValidObjectId(blogId)) {
      return res.status(400).send({ err: "invalid blogId" });
    }
    const blog = await Blog.findOne({ _id: blogId });
    return res.send({ blog });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ err: error.message });
  }
});

router.post("/blog", async (req, res) => {
  try {
    const { title, contents, isLive, userId } = req.body;
    if (typeof title !== "string")
      return res.status(400).send({ err: "title is required" });
    if (typeof contents !== "string")
      return res.status(400).send({ err: "contents is required" });
    if (isLive && typeof isLive !== "boolean")
      return res.status(400).send({ err: "isLive must be a boolean" });
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({ err: "invalid userId" });
    }
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).send({ err: "user does not exist" });
    }

    const blog = new Blog({ ...req.body, user });
    await blog.save();
    return res.send({ blog });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ err: error.message });
  }
});

router.delete("/blog/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!mongoose.isValidObjectId(blogId))
      return res.status(400).send({ err: "invalid blogId" });
    const blog = await Blog.findOneAndDelete({ _id: blogId });
    return res.send({ blog });
  } catch {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

router.put("/blog/:blogId", async (req, res) => {
  try {
    const { blogId } = req.params;
    if (!mongoose.isValidObjectId(blogId))
      return res.status(400).send({ err: "invalid blogId" });
    const { age, name } = req.body;
    if (!age && !name)
      return res.status(400).send({ err: "age or name is required" });
    if (age && typeof age !== "number")
      return res.status(400).send({ err: "age must be a number" });
    if (
      name &&
      typeof name.firstName !== "string" &&
      typeof name.lastName !== "number"
    )
      return res.status(400).send({ err: "first and last name is required" });
    let blog = await Blog.findById(blogId);
    if (age) blog.age = age;
    if (name) blog.name = name;
    await blog.save();
    return res.send({ blog });
  } catch {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;
