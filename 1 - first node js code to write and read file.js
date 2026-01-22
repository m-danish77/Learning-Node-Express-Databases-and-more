// Writing a file, creating output.txt
const fs = require('fs');
fs.writeFile(
  'output.txt',
  'Danish you can do it by the help of Allah',
  (err) => {
    if (err) throw err;
    console.log('File Written Successfully.');
  }
);

// // reading output.txt
// const fs = require('fs');
// fs.readFile("output.txt", 'utf8', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// })
