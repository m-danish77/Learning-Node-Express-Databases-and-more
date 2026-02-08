// We are Adding View Details Functionality

// Add a view Details button to the home list page and give href="home-list/<%= home.id %>" to the button. It will work like that when we click a specific home card in the Home List page It will redirect us to the Home Details page of that specific card with its id. like http://localhost:3000/home-list/1

// Add random id in Home Model in save method. It will give almost unique id to each home.

// Add a route in store router for /home-list/:homeId to get the details of a specific home.

// Add a method in store controller for getHomeDetail and just console.log the homeId by using req.params.

// Add a static findById method in Home Model and use it in store controller to get the details of a specific home in getHomeDetail method and then render the home detail page with details of that specific home.

// Now we are adding Favourite List functionality

// create a partial file favourite.ejs inside views/patials folder
// Create a form in favourite.ejs file which redirects to /favourite-list page and take hidden information of the homeId as POST method

// Add this patial (Add to favourites Button) in Home list page and in Home details page

// Add router in store router for /favourite-list and add a method in store controller for postAddToFavourite and just console.log the homeId by using req.body.id

// Create a new Model Favourite.js and Make Favourite Class in it and add a method addFavourite in it and use it in store controller postAddToFavourite method to add the id of that specific home in favourites.json file.

// Now add another static method in Favourite class called getFavourites which will return all the favourites from the favourites.json file and use it in store controller getFavouriteList method to get the favourites and render the favourite list page.

const express = require('express');

// local modules
const { storeRouter } = require('./routes/storeRouter');
const { hostRouter } = require('./routes/hostRouter');
const { pageNotFound } = require('./controllers/errors');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: true }));

app.use(storeRouter);

// "/host" is the common path for all hostRouters middleware
app.use('/host', hostRouter);
app.use(pageNotFound);

app.listen(3000, () => {
  console.log('Server is running at address http://localhost:3000');
});
