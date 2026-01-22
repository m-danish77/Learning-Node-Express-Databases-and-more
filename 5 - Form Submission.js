const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  res.setHeader('Content-type', 'text/html');
  if (req.url === '/home' || req.url === '/') {
    res.write(`
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>

        <body>
          <h1>Welcome to Home Page</h1>
          <form action="/submit-details" method="POST">
            <label for="name">Name:</label>
            <input type="text" name="name" id="name" placeholder="Enter Your Name">

            <br>
            <br>

            <label for="gender">Gender:</label>
            <label for="male">Male</label>
            <input type="radio" name="gender" id="male" value="male">

            <label for="female">Female</label>
            <input type="radio" name="gender" id="female" value="female">
            <br>
            <br>
            <input type="submit" value="submit">
          </form>
        </body>
        </html>
      `);
    return res.end();
  } else if (
    req.url.toLowerCase() === '/submit-details' &&
    req.method == 'POST'
  ) {
    res.statusCode = 302;
    res.setHeader('Location', '/'); // this set the url to default http://localhost:3000
    return res.end();
  }
  res.setHeader('Content-Type', 'text/html');
  res.write('<html>');
  res.write('<head><title>Complete Coding</title></head>');
  res.write('<body><h1>Error 404 Not Found</h1></body>');
  res.write('</html>');
  res.end();
});

server.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
