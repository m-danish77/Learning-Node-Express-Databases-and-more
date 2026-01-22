const path = require('path');

const express = require('express');
const homeRouter = express.Router();

const rootDir = require('../utils/pathUtil');

homeRouter.get('/', (req, res, next) => {
  console.log('Fourth / middleware');
  res.sendFile(path.join(rootDir, 'views', 'home-page.html'));
});

module.exports = homeRouter;
