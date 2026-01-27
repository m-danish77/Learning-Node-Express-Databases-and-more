// I created a controller folder and created homes & error controller .js files inside it. After that i moved the controller logic from Routes folder files to controllers files. Also 404 page controller logic from app.js to controllers folder file error.js. And do the essential wiring to make it work

// i created Models folder and created home.js file inside it. To seprate data retrival and store logic from controllers i moved it to model by making Home Class and its method and use it in controller homes.js file.Do destructuring and then things working

// After kiiling and restarting the server my stored data lost for this i create a data folder inside it homes.json file to store homes information. I do that by writing a logic in Model home.js file to write data.

// When write happens the nodemon restarts the server so i add nodemon.json file and gives my personal preference to nodemon so that it doesn't restart the server when write happens in data folder.

// Now to read the data from homes.json file i have to implement a callbacks in Model home.js and also do the essential rewriting in Controller homes.js file and then everything works

// External modules
const express = require('express');

// local modules
const { userRouter } = require('./routes/userRouter');
const { hostRouter } = require('./routes/hostRouter');
const { pageNotFound } = require('./controllers/errors');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));

app.use(userRouter);

// "/host" is the common path for all hostRouters middleware
app.use('/host', hostRouter);

app.use(pageNotFound);

app.listen(3000, () => {
  console.log('Server is running at address http://localhost:3000');
});
