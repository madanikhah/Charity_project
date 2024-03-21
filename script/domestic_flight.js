// // نمیدونم چرا با لیست همزمان نمایش داده نمیشه

// to show sig in page correctly do this lines!**************************
// const signinIcon = document.getElementById('signin-icon');
// const backgroundOverlay = document.getElementById('background-overlay');
// const signinModal = document.getElementById('signin-modal');

// signinIcon.addEventListener('click', () => {
//   backgroundOverlay.style.display = 'block';
//   signinModal.style.display = 'block';
// });

// backgroundOverlay.addEventListener('click', () => {
//   backgroundOverlay.style.display = 'none';
//   signinModal.style.display = 'none';
// });
// const domesticFlightButton = document.querySelector('#sign_up_button');

//     domesticFlightButton.addEventListener('click', () => {
//       window.location.href = 'sign_up.html';
//     });
// *****************************************



// $(document).ready(function() {
//     // مخفی کردن تمام فرم‌های جستجو
//     $('form').hide();

//     // نمایش فرم جستجوی پرواز داخلی با کلیک بر روی پرواز داخلی
//     $('#domestic-flight').click(function() {
//       $('form').hide();
//       $('#domestic-flight-form').show();
//     });
//     $('#international-flight').click(function() {
//         $('form').hide();
//         $('#international-flight-form').show();
//     });
//     $('#train').click(function() {
//         $('form').hide();
//         $('#train-form').show();
//     });
//     $('#bus').click(function() {
//         $('form').hide();
//         $('#bus-form').show();
//     });
//     $('#tour').click(function() {
//         $('form').hide();
//         $('#tour-form').show();
//       });
//     $('#hotel').click(function() {
//         $('form').hide();
//         $('#hotel-form').show();
//     });
//     $('#villa').click(function() {
//         $('form').hide();
//         $('#villa-form').show();
//       });


//     // ارسال فرم جستجو با استفاده از AJAX
//     $('#search-form').submit(function(event) {
//       event.preventDefault();

//       var origin = $('#origin').val();
//       var destination = $('#destination').val();
//       var date = $('#date').val();
//       var passengers = $('#passengers').val();

//       $.ajax({
//         url: 'search.php',
//         method: 'POST',
//         data: {
//           origin: origin,
//           destination: destination,
//           date: date,
//           passengers: passengers
//         },
//         success: function(response) {
//           $('#flight-table-container').html(response);
//         }
//       });
//     });
//   });




$(document).ready(function() {
  const signinIcon = $('#signin-icon');
  const backgroundOverlay = $('#background-overlay');
  const signinModal = $('#signin-modal');

  signinIcon.click(function() {
    backgroundOverlay.show();
    signinModal.show();
  });

  backgroundOverlay.click(function() {
    backgroundOverlay.hide();
    signinModal.hide();
  });

  const domesticFlightButton = $('#sign_up_button');

  domesticFlightButton.click(function() {
    window.location.href = 'sign_up.html';
  });
// });
  // مخفی کردن تمام فرم‌های جستجو
  $('form').hide();

  // نمایش فرم جستجوی پرواز داخلی با کلیک بر روی پرواز داخلی
  $('#domestic-flight').click(function() {
    $('form').hide();
    $('#domestic-flight-form').show();
  });
  $('#international-flight').click(function() {
    $('form').hide();
    $('#international-flight-form').show();
  });
  $('#train').click(function() {
    $('form').hide();
    $('#train-form').show();
  });
  $('#bus').click(function() {
    $('form').hide();
    $('#bus-form').show();
  });
  $('#tour').click(function() {
    $('form').hide();
    $('#tour-form').show();
  });
  $('#hotel').click(function() {
    $('form').hide();
    $('#hotel-form').show();
  });
  $('#villa').click(function() {
    $('form').hide();
    $('#villa-form').show();
  });

  // ارسال فرم جستجو با استفاده از AJAX
  $('#search-form').submit(function(event) {
    event.preventDefault();

    var origin = $('#origin').val();
    var destination = $('#destination').val();
    var date = $('#date').val();
    var passengers = $('#passengers').val();

    $.ajax({
      url: 'search.php',
      method: 'POST',
      data: {
        origin: origin,
        destination: destination,
        date: date,
        passengers: passengers
      },
      success: function(response) {
        $('#flight-table-container').html(response);
      }
    });
  });
});
