const testingRuntime = () => {
  // reference error x is not defined
  // console.log(x);
  const x = 10;
  console.log(`x should be defined and then call. x = ${x}`);
};

export { testingRuntime };
