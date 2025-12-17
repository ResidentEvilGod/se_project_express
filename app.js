const express = require("express");
const mongoose = require("mongoose");

const mainRouter = require("./routes");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .catch((err) => console.error(err));

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "000000000000000000000001",
  };
  next();
});

app.use("/", mainRouter);

app.use((req, res) => {
  res.status(404).send({ message: "Requested resource not found" });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message:
      statusCode === 500 ? "An error has occurred on the server" : message,
  });
});

app.listen(PORT);
