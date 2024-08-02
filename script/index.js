//for home.html
document.addEventListener('DOMContentLoaded', function() {

  document.getElementById('sign-in-form').addEventListener('submit', async (event) => {
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

          data = await response.json();
          // userName = data.message.username;
          window.location.href = '/home';
          try{
            localStorage.setItem('userName', data.message.username);
            localStorage.setItem('role', data.message.role_id);
          }catch(error){ window.alert(error);}

      } else {
        window.alert("کاربر وجود ندارد");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

});

$(document).ready(function() {
  const signinIcon = $('#signin-icon');
  const backgroundOverlay = $('#background-overlay');
  const signinModal = $('#signin-modal');

  $('#username').text(localStorage.getItem('userName')); 
  $('#role').text(localStorage.getItem('role')); 

  signinIcon.click(function() {
    backgroundOverlay.show();
    signinModal.show();
  });

  backgroundOverlay.click(function() {
    backgroundOverlay.hide();
    signinModal.hide();
  });

  $('#req').click(function() {
    $('form').hide();
    $('#req-form').show();
    handleReqFormSubmit();
  });

  $('#verification').click(function() {
    $('form').hide();
    $('#verification-form').show();
    handleVerificationFormSubmit();
  });

  $('#search-verification-id').click(function() {
    $('form').hide();
    $('#verification-fill-form').show();
    handleVerificationFillFormSubmit();
  });

  $('#test').click(function() {
      $('form').hide();
      $('#test-form').show();
      handleTestFormSubmit();
    });


  $('#interview').click(function() {
      $('form').hide();
      $('#interview-form').show();
      handleTestFormSubmit();
    });

  $('#interview-search').click(function() {
      $('form').hide();
      $('#interview-fill-form').show();
      handleVerificationFillFormSubmit();
    });


  $('#mali').click(function() {
      $('form').hide();
      $('#mali-form').show();
      handleTestFormSubmit();
    });

  $('#mali-search').click(function() {
      $('form').hide();
      $('#mali-fill-form').show();
      handleVerificationFillFormSubmit();
    });

  $('#enfagh').click(function() {
      $('form').hide();
      $('#enfagh-form').show();
      handleTestFormSubmit();
    });

   
});
