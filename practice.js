function accum(s) {
  let array = [];
  for (let i = 0; i < s.length; i++) {
    array.push(s[i]);
  }
  for (let i = 0; i < array.length; i++) {
    array[i] = `${array[i][0].toUpperCase()}${array[i][0].toLowerCase().repeat(i)}`;
  }
  return array.join("-");
}

console.log(accum('helLo'))