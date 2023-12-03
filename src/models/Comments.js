const mongoose = require("mongoose");

const CommentSchemas = new mongoose.Schema(
  {
    content: { type: String, reqired: true },
    user: { type: mongoose.Types.ObjectId, reqired: true },
    blog: { type: mongoose.Types.ObjectId, reqired: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", CommentSchemas);
module.exports = { Comment };
