const mongoose = require("mongoose");

const BlogSchemas = new mongoose.Schema(
  {
    title: { type: String, reqired: true },
    contents: { type: String, required: true },
    isLive: { type: Boolean, required: true, default: false },
    user: { type: mongoose.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", BlogSchemas);
module.exports = { Blog };
