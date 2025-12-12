// First Node Server
const http = require('http');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);
  res.setHeader('Content-type', 'text/html');
  res.write(`
    <!DOCTYPE html>
    <html lang="en">

    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Practice</title>
    </head>`
  );

  if (req.url === '/home') {
    res.write(`
    <body>
        <center><h1>Welcome To Home</h1></center>
    </body>
    </html>`);
    return res.end();

  } else if (req.url === '/products') {
    res.write(`
    <body>
        <center><h1>Products are below</h1></center>
    </body>
    </html>`
    );
    res.end();

  } else {
    res.write(`
    <body>
        <center><h1>Hello World</h1></center>
    </body>

    </html>`
    );
    res.end();
  }
});


const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});



// Improved version suggested by deepseek

// const http = require('http');
// const server = http.createServer((req, res) => {
//   console.log(req.url, req.method, req.headers);

//   res.setHeader('Content-type', 'text/html');
//   let content = '';
//   let title = '';
//   if (req.url === '/home' || req.url === '/') {
//     res.statusCode = 200;
//     content = `<center><h1>Welcome To Home</h1></center>`;
//     title = 'Home Page';
//   } else if (req.url === '/products') {
//     res.statusCode = 200;
//     content = `<center><h1>Products are below</h1></center>`;
//     title = 'Products Page';
//   } else {
//     res.statusCode = 404;
//     content = `<center><h1>Error Code 404</h1></center>`;
//     title = '404';
//   }

//   res.write(`
//    <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>${title}</title>
//     </head>
//     <body>
//     ${content}
//     </body>
//     </html>
//     `);
//   res.end();
// });

// server.listen(3000, () => {
//   console.log(`Server is running at http://localhost:3000`);
// });
