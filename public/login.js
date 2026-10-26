const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-message');
const status = document.querySelector('#status');
const loginSection = document.querySelector('#login-section');

async function checkAuthState() {
    try {
        const response = await fetch('/api/whoami');
        const data = await response.json();

        if (data.loggedIn) {
            status.innerHTML = '<h1> Welcome back!</h1><a href="/dashboard">Dashboard</a>';
            loginSection.hidden = true;
            logoutButton.hidden = false;
        } else {
            status.innerHTML = '';
            loginSection.hidden = false;
            loginButton.hidden = true;
        }
    } catch (error) {
        status.innerHTML = '';
        loginSection.hidden = false;
        logoutButton.hidden = true;
    }
}

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const password = document.querySelector('#password').value;
    const username = document.querySelector('#username').value;
    const rememberMe = event.target.rememberMe.checked;
    const response = await fetch(loginForm.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, rememberMe, username })
    });
    const data = await response.json().catch(() => ({ success: false }));
    if (data.success) {
        loginMessage.textContent = 'Login successful!';
        loginForm.reset();
        await checkAuthState();
        window.location.href = data.redirect || '/';
    } else {
        loginMessage.textContent = data.error || 'Login failed. Please check your password.';
    }
});



checkAuthState();