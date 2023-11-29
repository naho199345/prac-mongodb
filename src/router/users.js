const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const mongoose = require("mongoose");

router.get("/users", async (req, res) => {
  const user = await User.find();
  return res.send({ user });
});

router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).send({ err: "invalid userId" });
    }
    const user = await User.findOne({ _id: userId });
    return res.send({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ err: error.message });
  }
});

router.post("/user", async (req, res) => {
  try {
    const { userName, name, age, email } = req.body;
    const user = new User({ userName, name, age, email });
    await user.save();
    return res.send({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ err: error.message });
  }
});

router.delete("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
    const user = await User.findOneAndDelete({ _id: userId });
    return res.send({ user });
  } catch {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;
