const form = document.getElementById('sign-in-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const phoneNumber = document.getElementById('phone-number').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/sign_in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phoneNumber, password })
    });

    if (response.ok) {
      const data = await response.json();
      window.location.href = '/home';
    } else {
      window.alert("کاربر وجود ندارد");
      // Display an error message to the user
    }
  } catch (error) {
    console.error('Error:', error);
    // Display a general error message to the user
  }
});
