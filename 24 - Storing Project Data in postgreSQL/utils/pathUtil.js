const path = require('path');

// it stores the address or path of where the main file in my case app2.js is located
module.exports = path.dirname(require.main.filename);
