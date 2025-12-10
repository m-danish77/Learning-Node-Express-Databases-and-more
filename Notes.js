// If you compare two objects there refrences will compare not their values or objects
// if both have the same refrence then they gives true when comparing otherwise false

let student = {
  rollNumber: 1,
  studentName: 'Muhammad Munib Danish',
  CGPA: 3.45
};

let student2 = JSON.parse(JSON.stringify(student)); // Deep Copy

console.log(student === student2); // false both have different refrence

// let student2 = student; // same refrence gives true when comparing
// same refrence is because we are making copy of refrence not the object

