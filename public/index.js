const username = document.querySelector('#username').value;

// ...and in the fetch:
body: JSON.stringify({ username, password, rememberMe })
status.textContent = '';
const heading = document.createElement('h1');
heading.textContent = `Welcome back, ${data.username}!`;
status.append(heading);