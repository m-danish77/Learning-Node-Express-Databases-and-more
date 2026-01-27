/**
 * AIRBNB PROJECT REFACTORING - 7 STEP LOGIC SUMMARY
 * -----------------------------------------------
 * * STEP 1: FOLDER RESTRUCTURING
 * Logic: Created 'admin' and 'store' sub-folders within the 'views' directory and move respective files there.
 * This implements "Separation of Concerns," ensuring host-side and guest-side
 *
 *
 * * STEP 2: DUMMY VIEW TEMPLATES
 * Logic: Created new .ejs files for all required pages in respective host & store folders.
 *
 *
 * * STEP 3: NAVIGATION HEADER UPDATE
 * Logic: Updated the global header with anchor tags to map the entire site.
 *
 *
 * * STEP 4: ROUTE REGISTRATION
 * Logic: Make Routes for all dummy views files created in step 2
 *
 *
 * * STEP 5: CONTROLLER ORGANIZATION (MVC)
 * Logic: Established 'admin.js' and 'store.js' controllers.
 * Following the MVC pattern, these functions handle the logic of receiving. Split the homes.js into admin.js & store.js and moves the respective controllers there
 *
 *
 * * STEP 6: ADMIN ACTION UI
 * Logic: Enhanced the 'host-home-list.ejs' view by adding 'Edit' and 'Delete' Buttons to each Home Card.
 *
 *
 * * STEP 7: PENDING LOGIC STRATEGY
 * Logic: Deliberately kept the complex logic for Edit, Delete, and Favorites
 * "pending." This allows for testing the complete architectural flow (MVC)
 * before connecting the application to a database.
 */

// External modules
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
