const sumRequestHandler = (req, res) => {
  const body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    const fullBody = Buffer.concat(body).toString();
    const params = new URLSearchParams(fullBody);
    const objectBody = Object.fromEntries(params);

    const value1 = parseFloat(objectBody.value1) || 0;
    const value2 = parseFloat(objectBody.value2) || 0;
    const sum = value1 + value2;

    res.write(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Result</title>
  </head>
  <body>
    <h1>The Sum is ${sum}</h1>
  </body>
</html>
        `);
    res.end();
  });
};

module.exports = { sumRequestHandler };
