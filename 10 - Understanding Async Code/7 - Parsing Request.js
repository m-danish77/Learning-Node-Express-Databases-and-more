const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/html");
  if (req.url === "/home" || req.url === "/") {
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
    req.url.toLowerCase() === "/submit-details" &&
    req.method == "POST"
  ) {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const fullBody = Buffer.concat(body).toString();
      const params = new URLSearchParams(fullBody);
      const bodyObject = Object.fromEntries(params);

      // writeFilesync is synchronous and not recomending it slows down the event loop and block the other code to execute

      // fs.writeFileSync("output.txt", JSON.stringify(bodyObject));

      // this below code is recomending as it is asynchronous and dont block the event loop (single main thread execution)
      fs.writeFile("output.txt", JSON.stringify(bodyObject), (err) => {
        console.log(
          "Callback is required for async functions. this code will run no matter what"
        );
      });
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });

    // this code should'nt be here as we are redirection the client to "/" home page before the upper async code execution (fs.writeFile). some error can occur but at that time the response will be finished and we cant do anything.
    // So we move this code above

    // res.statusCode = 302;
    // res.setHeader("Location", "/");
    // return res.end();

    // we have to wrap up the below code in else otherwise it will execute due to aynchronous code execution or we can use return

    return;
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>Complete Coding</title></head>");
  res.write("<body><h1>Error 404 Not Found</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
