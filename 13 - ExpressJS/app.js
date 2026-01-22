// // core module
// import http from "http"; this dont need now because express can do this

// external module
import express from 'express';

const app = express();

// if no path is giving it runs for every request
app.use((req, res, next) => {
  console.log('First MiddleWare', req.url);
  next();
});

app.use((req, res, next) => {
  console.log('Second MiddleWare', req.method);

  // after sending response we can't send another one
  // res.send("<center><h1>Hello World</h1></center>");
  next();
});

// for app.use('/', ...) it runs for every url. So you should use  app.get('/', ...) or app.post('/', ...) this will only run for itself path ('/')
app.get('/', (req, res, next) => {
  console.log(
    "Using app.get('/', ...). See 14 - ExpressJs Exercise for Better understanding"
  );
  res.send(`<h1>You are at Home Page</h1>`);
});

app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});

// See 14 - ExpressJs Exercise for Better understanding
