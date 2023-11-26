const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("hello word!!");
});

app.listen(3000, function () {
  console.log("server listening on port : 3000");
});
