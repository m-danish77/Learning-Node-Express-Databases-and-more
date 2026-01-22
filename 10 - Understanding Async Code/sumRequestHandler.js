const sumRequestHandler = (req, res) => {
  const body = [];

  // This is async code when code reaches there as it is asynchronous event loop give this task to worker threads and go forward to execute further task this code will execute in future
  req.on('data', (chunk) => {
    body.push(chunk);
  });

  // same will happen to below code. it is aynchronous and it will run when whole data is added to body in upper code in form of chunks
  req.on('end', () => {
    const fullBody = Buffer.concat(body).toString();
    const params = new URLSearchParams(fullBody);
    const objectBody = Object.fromEntries(params);

    const value1 = parseFloat(objectBody.value1) || 0;
    const value2 = parseFloat(objectBody.value2) || 0;
    const sum = value1 + value2;
  });

  // event loop jumps here and execute this code thats why this is wrong approach
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
  return res.end();
};

module.exports = { sumRequestHandler };
