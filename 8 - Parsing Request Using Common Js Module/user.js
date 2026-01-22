const fs = require('fs');
const userRequestHandler = (req, res) => {
  console.log(req.url, req.method);

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
    const body = [];
    req.on('data', (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on('end', () => {
      // just like Array.prototype.concat used for arrays Buffer.concat used for concatination of binary data
      const fullBody = Buffer.concat(body).toString();
      console.log(fullBody);

      // new URLSearchParams(fullBody) - Creates an object that automatically parses URL-encoded form data (like "name=John&gender=male") into usable key-value pairs, handling URL decoding and special characters for you.
      const params = new URLSearchParams(fullBody);

      // const bodyObject = {};
      // for (const [key, value] of params.entries()) {
      //   bodyObject[key] = value;
      // }

      const bodyObject = Object.fromEntries(params);
      // Converts the URLSearchParams object (which is a list of key-value pairs like [["name", "John"], ["gender", "male"]]) into a regular JavaScript object {name: "John", gender: "male"} - much easier to work with!

      console.log(bodyObject);
      fs.writeFileSync('output.txt', JSON.stringify(bodyObject));
    });

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
};

// for understand Common JS module syntax
const helloWorld = 'Hello World!';

module.exports = {
  userRequestHandler,
  helloWorld,
};
