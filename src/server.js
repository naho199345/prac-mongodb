const express = require("express");
const connect = require("./models");
const cors = require("cors");

const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const routers = require("./router");

const app = express();
connect();

app.get("/", function (req, res) {
  res.send("hello word!!");
});

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100,
  })
);

app.use((req, res, next) => {
  if (req.originalUrl === "/") return next();
  console.log(
    "Request URL:",
    `[${req.method}]`,
    req.originalUrl,
    " - ",
    new Date().toLocaleString(),
    req.ip
  );
  next();
});

app.use("/api", routers);

app.use((err, req, res, next) => {
  res.status(400).send({ errorMessage: err });
});

app.listen(3000, function () {
  console.log("server listening on port : 3000");
});
