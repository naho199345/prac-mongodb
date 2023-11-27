const mongoose = require("mongoose");

const UserSchemas = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
    },
    name: {
      firstName: { type: String, require: true },
      lastName: { type: String, require: true },
    },
    age: Number,
    email: String,
  },
  { timeStamps: true }
);

const User = mongoose.model("user", UserSchemas);
module.exports = { User };
