let student = {
  rollNumber: 1,
  studentName: 'Muhammad Munib Danish',
  CGPA: 3.45
};

let student2 = JSON.parse(JSON.stringify(student));

// console.log(student2);
// delete student.rollNumber;
// console.log(student2);

console.log(student === student2);