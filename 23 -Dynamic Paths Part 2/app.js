// Adding Edit Home Functionality

// rename form-page.ejs to edit-home.ejs => we will use same page for add home and also for edit home

// fix the controller getAddHome and now render edit-home.ejs page insted of form-page.ejs

// In host-home-list add href="" inside the edit button and add dynamic path to it like this href="/host/edit-home/<%= home.id %>? editing=true" we will use editing=true to identify that we are in edit mode.

// add new controller getEditHome pass editing in the view then we will use this editing to identify that we are in edit mode or we are just adding home and use findbyId method to identify which home card edit button is clicked and add new route for it in hostRouter.js file

//now adding prefilled data in edit-home.ejs page by using editing variable and home variable and also use this same technique to add dynamic path.

// now we will handle what should happen if we click the update home

//we hill add hidden input field in edit-home.ejs page to store the id of the home which we want to edit and then we will use this id in postEditHome controller (we will make it) to identify which home we want to update. we pass new details to constructor and then save and then redirect to host-home-list page.

// we will also update save method in Home Class.

// We will also add postEditHome route in hostRouter.js file

// adding Delete functionality

// suurond delete button with form and add method post and add dynamic path to it like this action="/host/delete-home/<%= home.id %>" and then we will add deleteHomeById method in Home Class then we will make postDeleteHome controller to handle the delete functionality by using deleteHomeById method and also use deleteFavourite method inside this controller that we will make in future and also add route for it in hostRouter.js file.

// Now implementing Remove from Favourite Functionality inside Favourite list page by adding button "Remove From Favourite" to every card

// add form around the button "remove from favourite" in favourite-list.ejs page and add action="/favourite-list/delete/<%= home.id %>" now add its router in storeRouter.js file and add its controller in storeController.js file and then we will make deleteFavourite method in Favourite Class to handle the delete functionality and also we will use this method in postDeleteHome controller to remove the home from favourite list if home is deleted by host.

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
