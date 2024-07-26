$(document).ready(function() {
  $('#sign-in-form').submit(async function(event) {
      event.preventDefault(); // Prevent the default form submission

      const phoneNumber = $('#phone-number').val();
      const password = $('#password').val();

      try {
          const response = await $.ajax({
              url: '/sign_in',
              method: 'POST',
              contentType: 'application/json',
              data: JSON.stringify({ phoneNumber, password })
          });

          // If the response is successful, redirect to home
          window.location.href = '/home';
      } catch (error) {
          console.error('Error:', error);
          window.alert("کاربر وجود ندارد"); // Display an error message to the user
      }
  });
});
