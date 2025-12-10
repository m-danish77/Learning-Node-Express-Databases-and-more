const h1 = document.querySelector('h1');
const greeting = (name) => h1.innerHTML = `Hello ${name}`
const processUserInput = (callback) => {
  const name = prompt('Please enter your name.');
  greeting(name);
}

processUserInput(greeting);