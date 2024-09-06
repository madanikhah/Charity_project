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

  // Function to handle showing forms and scrolling to them
  function showFormAndScroll(formId) {
    $('form').hide(); // Hide all forms
    $(formId).show(); // Show the targeted form
    $('html, body').animate({
      scrollTop: $(formId).offset().top // Scroll to the top of the form
    }, 500); // Duration of the scroll animation
  }

  $('#req').click(function() {
    showFormAndScroll('#req-form');
    handleReqFormSubmit();
  });

  $('#verification').click(function() {
    showFormAndScroll('#verification-form');
    handleVerificationFormSubmit();
  });

  $('#search-verification-id').click(function() {
    showFormAndScroll('#verification-fill-form');
    handleVerificationFillFormSubmit();
  });

  $('#test').click(function() {
    showFormAndScroll('#test-form');
    handleTestFormSubmit();
  });

  $('#interview').click(function() {
    showFormAndScroll('#interview-form');
    handleTestFormSubmit();
  });

  $('#interview-search').click(function() {
    showFormAndScroll('#interview-fill-form');
    handleVerificationFillFormSubmit();
  });

  $('#mali').click(function() {
    showFormAndScroll('#mali-form');
    handleTestFormSubmit();
  });

  $('#mali-search').click(function() {
    showFormAndScroll('#mali-fill-form');
    handleVerificationFillFormSubmit();
  });

  $('#enfagh').click(function() {
    showFormAndScroll('#enfagh-form');
    handleTestFormSubmit();
  });

  $('#status').click(function() {
    showFormAndScroll('#status-form');
    handleStatusFormSubmit();
  });

  $('#farhangi').click(function() {
    showFormAndScroll('#farhangi-form');
    handleStatusFormSubmit();
  });
});


$(document).ready(function() {
  // Get the role ID from localStorage
  const roleId = localStorage.getItem('role');

  // Check if roleId is not null and is a number
  switch(roleId){
    case '0':
      // Disable other sections for role ID 0
      $('#verification').prop('disabled', true).closest('label').addClass('disabled');
      $('#test').prop('disabled', true).closest('label').addClass('disabled');
      $('#interview').prop('disabled', true).closest('label').addClass('disabled');
      $('#mali').prop('disabled', true).closest('label').addClass('disabled');
      $('#enfagh').prop('disabled', true).closest('label').addClass('disabled');


      // Change the color of disabled labels
      $('.disabled').css('color', 'gray');
      break;

    case '1':
      $('#test').prop('disabled', true).closest('label').addClass('disabled');
      $('#interview').prop('disabled', true).closest('label').addClass('disabled');
      $('#mali').prop('disabled', true).closest('label').addClass('disabled');
      $('#enfagh').prop('disabled', true).closest('label').addClass('disabled');

      // Change the color of disabled labels
      $('.disabled').css('color', 'gray');
      // Full access for role ID 1 (no action needed)
      break;
      case '2':
      $('#interview').prop('disabled', true).closest('label').addClass('disabled');
      $('#mali').prop('disabled', true).closest('label').addClass('disabled');
      $('#enfagh').prop('disabled', true).closest('label').addClass('disabled');

      // Change the color of disabled labels
      $('.disabled').css('color', 'gray');
      // Full access for role ID 1 (no action needed)
      break;
      case '3':
      $('#mali').prop('disabled', true).closest('label').addClass('disabled');
      $('#enfagh').prop('disabled', true).closest('label').addClass('disabled');

      // Change the color of disabled labels
      $('.disabled').css('color', 'gray');
      // Full access for role ID 1 (no action needed)
      break;
      case '4':
      $('#enfagh').prop('disabled', true).closest('label').addClass('disabled');

      // Change the color of disabled labels
      $('.disabled').css('color', 'gray');
      // Full access for role ID 1 (no action needed)
      break;
      case '1':
      break;

  // Add more cases as needed for other roles
  default:
      console.warn('Unknown role ID:', roleId);
      break;
  }


  if(roleId !== null && roleId === '0') {
      // Disable other sections for role ID 0
      $('#verification').prop('disabled', true).closest('label').addClass('disabled');
      $('#test').prop('disabled', true).closest('label').addClass('disabled');
      $('#interview').prop('disabled', true).closest('label').addClass('disabled');

      // Change the color of disabled labels
      $('.disabled').css('color', 'gray');
  }
});
