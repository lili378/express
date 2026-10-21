const logoutButton = document.querySelector('#logout-button');
logoutButton.addEventListener('click', async () => {
    const response = await fetch('/logout', {
        method: 'POST'
    });
    const data = await response.json().catch(() => ({ sucess: false }));
    if (data.sucess) {
        window.location.href = '/';
    }
});