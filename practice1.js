function decimalToBinary(num) {
  let str = '';
  while (num > 0) {
    str += num % 2;
    num = Math.floor(num / 2);
  }
  return Number(str.split('').reverse().join(''));
}

console.log(decimalToBinary(-12));
