const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      ignoreUndefined: true,
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("connect DB");
};

module.exports = connect;
