const path = require("path");

const express = require("express");

const userRouter = require("./routes/userRouter");
const homeRouter = require("./routes/homeRouter");
const rootDir = require("./utils/pathUtil");

const app = express();

app.use(express.urlencoded());

app.use((req, res, next) => {
  console.log("First dummy middleware", req.url);
  next();
});

app.use((req, res, next) => {
  console.log("Second dummy middleware", req.method);
  next();
});

app.use((req, res, next) => {
  console.log("Third response middleware");
  // comenting below line so we can complete practice set
  // res.send(`<h1>Third respone middleware</h1>`);
  next();
});

app.use(homeRouter);
app.use(userRouter);

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
});

app.listen(3000, () => {
  console.log("Server is running at address http://localhost:3000");
});
