const fs = require('fs');
fs.readFile("output.txt", 'Danish you can do it by the help of Allah', (err) => {
  if (err) throw err;
  console.log('File Written Successfully.');
})