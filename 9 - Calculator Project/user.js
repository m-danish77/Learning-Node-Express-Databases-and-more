const { sumRequestHandler } = require("./sumRequestHandler");
const userRequestHandler = (req, res) => {
  res.setHeader("Content-Type", "text/html");

  if (req.url.toLowerCase() === "/") {
    res.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculator Project</title>
  </head>
  <body>
    <center><h1>Welcome to the Calculator Project</h1></center>
    <center><h1><a href="/calculator">Go To The Calculator Page</a></h1></center>
  </body>
</html>
      `);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculator") {
    res.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calculator</title>
  </head>
  <body>
    <form action="/calculate-result"  method="POST">
      <label for="value1">Enter First Value: </label>
      <input type="number" name="value1" id="value1" />
      &nbsp; &nbsp; &nbsp;
      <label for="value2">Enter Second Value: </label>
      <input type="number" name="value2" id="value2" />

      <br />
      <br />
      <input type="submit" name="sum" id="sum" value="Sum" />
    </form>
  </body>
</html>
      `);
    return res.end();
  } else if (req.url.toLowerCase() === "/calculate-result") {
    return sumRequestHandler(req, res);
  }

  res.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Error</title>
  </head>
  <body>
    <h1>Error 404 Not Found <a href="/">Go To Home</a></h1>
  </body>
</html>

    `);
  return res.end();
};

module.exports = {
  userRequestHandler,
};
