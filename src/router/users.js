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

router.put("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ err: "invalid userId" });
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
    // 수정할 사항이 단순할 때, 1번 호출이 되서 효율
    // let updateBody = {};
    // if (age) updateBody.age = age;
    // if (name) updateBody.name = name;
    // const user = await User.findByIdAndUpdate(userId, updateBody, {
    //   new: true,
    // });

    // 수정할 사항이 복잡할 때, 2번 호출이 되서 비효율
    let user = await User.findById(userId);
    if (age) user.age = age;
    if (name) user.name = name;
    await user.save();
    return res.send({ user });
  } catch {
    console.log(err);
    return res.status(500).send({ err: err.message });
  }
});

module.exports = router;
