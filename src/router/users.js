const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

router.get("/users", async (req, res) => {
  const user = await User.find();
  return res.send({ user });
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
module.exports = router;
