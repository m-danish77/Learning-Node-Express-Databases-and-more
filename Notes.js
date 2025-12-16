// If you compare two objects there refrences will compare not their values or objects
// if both have the same refrence then they gives true when comparing otherwise false

let student = {
  rollNumber: 1,
  studentName: "Muhammad Munib Danish",
  CGPA: 3.45,
};

let student2 = JSON.parse(JSON.stringify(student)); // Deep Copy
console.log(student === student2); // false both have different refrence

// let student2 = student; // same refrence gives true when comparing
// same refrence is because we are making copy of refrence not the object

let array1 = [1, 2, 3, null, true, { myName: "Danish" }];
console.log(array1); // typeof Array is Object

// We also compare refrences in arrays

// spread operator method is used to make copy of arrays and Objects.
// but for objects it makes shallow copy, not deep copy

let array2 = [...array1];
console.log(array2);
console.log(array1 === array2);

// Look at the output of the below code in terminal so that you can understand the priority in execution of async code

console.log("1. Start of script");
// Microtask queue (Promise)
Promise.resolve().then(() => console.log("2. Microtask 1"));
// Timer queue
setTimeout(() => console.log("3. Timer 1"), 0);
// I/O queue
const fs = require("fs");
fs.readFile("user-details.txt", () => console.log("4. I/O operation"));
// Check queue
setImmediate(() => console.log("5. Immediate 1"));
// Close queue
process.on("exit", (code) => {
  console.log("6. Exit event");
});
console.log("7. End of script");

// .gitignore syntax is very important the comment takes seprate line you can write the code and commit in same line it will not work
// node_modules/         # this will not work
// comment and the code should be in seprate lines
// # this will work
// node_modules/
