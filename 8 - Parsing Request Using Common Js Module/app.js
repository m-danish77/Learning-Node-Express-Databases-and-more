const http = require("http");
// while importing names should be same you can rename them by adding : newName
const {
  userRequestHandler: requestHandler,
  helloWorld: hWorld,
} = require("./user");
const server = http.createServer(requestHandler);

server.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`);
});
console.log(hWorld);
