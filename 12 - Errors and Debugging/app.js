import http from 'http';
import { testingSyntax } from './testingSyntaxError.js';
import { testingRuntime } from './testingRuntimeError.js';
import { testingLogical } from './testingLogicalError.js';
const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  testingSyntax();
  testingRuntime();
  testingLogical();
});
server.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
