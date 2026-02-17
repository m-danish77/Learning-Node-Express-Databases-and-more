function createPhoneNumber(numbers) {
  const numbersString = numbers.join('');
  return `(${numbersString.slice(0, 3)}) ${numbersString.slice(3, 6)}-${numbersString.slice(6, 10)}`;
}

console.log(createPhoneNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]));
