// In this file we are just using body-parser to parse the submit response (it can also be dont with express without installing body-parser). The main content file of 15 - ExpressJs Deepdive is app2.js and all files related to it

const express = require('express');

// For parsing the body
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  console.log('First dummy middleware', req.url);
  next();
});

app.use((req, res, next) => {
  console.log('Second dummy middleware', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('Third response middleware');
  // comenting below line so we can complete practice set
  // res.send(`<h1>Third respone middleware</h1>`);
  next();
});

app.get('/', (req, res, next) => {
  console.log('Fourth / middleware');
  res.send('<h1>Welcome to Home Page</h1>');
});

app.get('/contact-us', (req, res, next) => {
  res.send(`
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Us</title>
        </head>

        <body>
          <h1>Contact Us Page</h1>
          <form action="/contact-us" method="POST">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" placeholder="Enter Your Name">

            <br>
            <br>

            <label for="name">Email:</label>
            <input type="email" name="email" id="email" placeholder="Enter Your Email">

            <br>
            <br>

            <input type="submit" value="submit">
          </form>
        </body>
        </html>
    `);
});

// It should be use before the post request. This will parse the body and give it the output in Object Form
app.use(bodyParser.urlencoded());

app.post('/contact-us', (req, res, next) => {
  console.log('Handled the incoming post request');

  // req.body will give the parsed data
  console.log(req.body);

  res.send(
    '<h1>Your Data is Successfully Received. We will contact you soon</h1>'
  );
});

app.listen(3000, () => {
  console.log('Server is running at address http://localhost:3000');
});
