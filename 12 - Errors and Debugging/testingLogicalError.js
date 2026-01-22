const testingLogical = () => {
  let y = 10;
  if ((y = 20)) {
    // used assignment operator insted of comparison
    console.log('console.log y = 20');
  } else {
    console.log('y = 10');
  }
};
export { testingLogical };
