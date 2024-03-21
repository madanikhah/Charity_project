$(document).ready(function() {
    $('#edit-profile-form').submit(function(e) {
      e.preventDefault();
  
      // Get the form data
      var formData = $(this).serialize();
  
      // Send the form data to the server
      $.ajax({
        url: '/edit-profile.php',
        type: 'POST',
        data: formData,
        success: function(response) {
          alert('اطلاعات شما با موفقیت به روز شد.');
        },
        error: function(xhr, status, error) {
          alert('خطا در به روز رسانی اطلاعات کاربری.');
        }
      });
    });
  
    $('.btn-secondary').click(function() {
      // Code to handle changes to the form
    });
  });
  