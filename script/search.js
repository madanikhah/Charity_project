
$(document).ready(function() {
  // Listen for changes in the search type selection
  $('#search-type').on('change', function() {
      // const searchType = $(this).val();
      const searchInputContainer = $('#search-input-container');      
      // Clear previous inputs
      searchInputContainer.empty();

      // Create an input field based on the selected search type
     // if (searchType) {
          const inputLabel =  $('<label>').text('');
          // switch (searchType){
          //   case 'public-code' : 
          //      $('<label>').text('کد عمومی');
          //   break;
          //   case 'last-name' : 
          //      $('<label>').text('نام خانوادگی');
          //   break;
          //   case "mobile-phone" : 
          //   $('<label>').text('شماره همراه');
          //   break;
          // }
          const inputField = $('<input>')
              .attr('type', 'text')
              .attr('name', 'search-input')
              .attr('placeholder', 'جستجو کنید...')
              .addClass('form-control');

          searchInputContainer.append(inputLabel).append(inputField);
      
  });

  // Handle form submission
  $('form').on('submit', async function(event) {
      event.preventDefault(); // Prevent default form submission

      const searchType = $('#search-type').val();
      const searchInput = $('#search-input-container').find('input[name="search-input"]').val();
      try {
          const response = await $.ajax({
              url: '/search_advanced',
              method: 'POST',
              contentType: 'application/json',
              data: JSON.stringify({ searchType, searchInput })
          });
          if (response) {
            const data = await response;
            // displaySearchResults(data);
            
              // Assuming data is in the format of RowDataPacket
              
              $('#firstname').text(data.message.firstname);
              $('#lastname').text(data.message.lastname);
              $('#fathername').text(data.message.fathername);

              $('#birth').text(convertToPersianNumbers(data.message.birth));
              $('#phone').text(convertToPersianNumbers(data.message.phone));
              $('#addiction').text(data.message.addiction ? 'دارد' : 'ندارد');
              $('#evaluation').text(changeDateFormat(data.message.evaluation));
              $('#sickness').text(data.message.sickness || 'ندارد');
              $('#supporter_id').text(data.message.supporter_id);
              $('#education_id').text(data.message.education_id ==1 ?'بی سواد': 'سیکل');
              $('#national_code').text(convertToPersianNumbers(data.message.national_code));
              $('#result_evaluation_id').text(data.message.result_evaluation_id);
              $('#bimeh_id').text(data.message.bimeh_id);
              $('#nationality').text(data.message.nationality);
              $('#religion').text(data.message.religion ==1 ?'بله': 'خیر');
              $('#martial_id').text(data.message.martial_id ?'متاهل': 'مجرد');
              $('#married_child').text(convertToPersianNumbers(data.message.married_child));
              $('#under_coverd').text(convertToPersianNumbers(data.message.under_coverd));
              $('#address').text(data.message.address);
              $('#partner_phone').text(convertToPersianNumbers(data.message.partner_phone));
              $('#partner_firstname').text(data.message.partner_firstname);
              $('#partner_education_id').text(data.message.partner_education_id ==1 ?'بی سواد': 'سیکل');
              $('#partner_birth').text(convertToPersianNumbers(data.message.partner_birth));
              $('#partner_sickness').text(data.message.partner_sickness ? 'دارد' : 'ندارد');
              $('#partner_addiction').text(data.message.partner_addiction ? 'دارد' : 'ندارد');
              $('#partner_description').text(data.message.partner_description);
              $('#description').text(data.message.description);
              $('#partner_lastname').text(data.message.partner_lastname);
              $('#interview_date').text(changeDateFormat(data.message.interview_date));

              $('#family_level').text(convertToPersianNumbers(data.message.family_level));
              $('#roshd_level').text(convertToPersianNumbers(data.message.roshd_level));
              $('#honesty').text(data.message.honesty);
              $('#sabad_commend').text(data.message.sabad_commend);
              $('#kanoon_roshd_commend').text(data.message.kanoon_roshd_commend);
              $('#hasane_commend').text(data.message.hasane_commend);
              $('#cultural_commend').text(data.message.cultural_commend);
              $('#income_cost').text(convertToPersianNumbers(data.message.income_cost));
              $('#interviewer1_id').text(data.message.interviewer1_id);
              $('#interviewer2_id').text(data.message.interviewer2_id);
              $('#interviewer3_id').text(data.message.interviewer3_id);
              $('#necceary').text(data.message.necceary);
              $('#sabad_amount').text(data.message.sabad_amount);
              $('#cardnumber').text(convertToPersianNumbers(data.message.cardnumber));
              $('#black_cultural').text(data.message.black_cultural);
              $('#created_at').text(changeDateFormat(data.message.created_at));
              $('#enfagh_count').text(convertToPersianNumbers(data.message.enfagh_count));
              $('#enfagh_sum').text(convertToPersianNumbers(data.message.enfagh_sum));
              $('#cultrul_sum').text(convertToPersianNumbers(data.message.cultrul_sum));
              $('#cultrual_count').text(convertToPersianNumbers(data.message.cultrual_count));
              $('#public_code').text(convertToPersianNumbers(data.message.public_code));
              
            
            // window.alert('کد پیداشده');
          } else {
            alert('متقاضی یافت نشد!');
          }
      } catch (error) {
          window.alert( "مشکی رخ داده است!");
      }
  });
});
// +++
function handleStatusFormSubmit() {
  $('#status-form').on('submit', async function(event) {
      event.preventDefault();

      const firstname = $('#firstname-req-id').val();
      const lastname = $('#lastname-req-id').val();
      const fathername = $('#fathername-req-id').val();
      const national_code = $('#national-code-req-id').val();
      const birth = $('#birth-req-id').val();
      const phone = $('#phone-req-id').val();
      const representative = $('#representative-req-id').val();
      const date = $('#date-req-id').val();
      const level = $('#level-req-id').val();

      // Validate the form data
      if (!validateFormData({ firstname, lastname, fathername, national_code, phone })) {
          return; // Return if the data is invalid
      }

      try {
          const response = await fetch('/submit_request', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ firstname, lastname, fathername, national_code, birth, phone, representative, date, level })
          });

          if (response.ok) {
              const data = await response.json();
              alert("ثبت شد");
              window.location.href = '/home';
          } else {
              alert("مشکلی پیش آمده");
          }
      } catch (error) {
          console.error('Error:', error);
      }
  });
}

function showResult(){
  
}

function changeDateFormat(interviewDate) {
    // Create a Date object from the input date string
    var dateObj = new Date(interviewDate);

    // Format the date to 'YYYY-MM-DD' using toLocaleDateString
    var options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    var formattedDate = dateObj.toLocaleDateString('fa-IR', options); // Farsi locale

    return formattedDate;
}
function convertToPersianNumbers(number) {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number.toString().replace(/\d/g, function(digit) {
      return persianNumbers[digit];
  });
}

// ++
// ===============================

// $(document).ready(function() {
//   $('#search-type').change(function() {
//     $('#search-input-container').html('');
//     switch ($(this).val()) {
//       case 'public-code':
//         $('#search-input-container').html('<label for="public-code">کد عمومی</label><input type="text" class="form-control" id="public-code" name="public-code">');
//         break;
//       case 'last-name':
//         $('#search-input-container').html('<label for="last-name">نام خانوادگی</label><input type="text" class="form-control" id="last-name" name="last-name">');
//         break;
//       case 'mobile-phone':
//         $('#search-input-container').html('<label for="mobile-phone">تلفن همراه</label><input type="tel" class="form-control" id="mobile-phone" name="mobile-phone">');
//         break;
//     }
//   });

//   $('#submit-search').click(async function() {
//     try {
//       const response = await $.ajax({
//         url: '/search_advanced',
//         method: 'POST',
//         contentType: 'application/json',
//         data: JSON.stringify({ searchType: $('#search-type').val(), searchInput: $('#search-input-container').find('input').val() })
//       });

//       if (response) {
//         displaySearchResults(response);
//         window.alert('کد پیداشده');
//       } else {
//         alert('No data found for the provided search criteria.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('An error occurred while processing the search.');
//     }
//   });

  function displaySearchResults(results) {
    window.alert("jythrgtefdwasxdcwfvgerbhyt");
    // const table = $('<table>').addClass('table table-striped mt-3');
    // const headerRow = $('<tr>');
    // headerRow.append($('<th>').text('Last Name'));
    // headerRow.append($('<th>').text('Public Code'));
    // headerRow.append($('<th>').text('National Code'));
    // headerRow.append($('<th>').text('Donation'));
    // table.append(headerRow);

    // results.forEach(function(result) {
    //   const row = $('<tr>');
    //   row.append($('<td>').text(result.firstname));
    //   row.append($('<td>').text(result.lastname));
    //   row.append($('<td>').text(result.fathername));
    //   row.append($('<td>').text(result.birth));
    //   row.append($('<td>').text(result.phone));
    //   row.append($('<td>').text(result.addiction));
    //   row.append($('<td>').text(result.sickness));
    //   row.append($('<td>').text(result.supporter_id));
    //   row.append($('<td>').text(result.education_id));
    //   row.append($('<td>').text(result.national_code));
    //   row.append($('<td>').text(result.result_evaluation_id));
    //   row.append($('<td>').text(result.bimeh_id));
    //   row.append($('<td>').text(result.lastname));



    //   table.append(row);
    // });

    // $('#searchResults').empty().append(table);
  }

//   $(document).ready(function() {
//     // AJAX call to fetch data from the backend
//     $.ajax({
//         url: '/api/user-info', // Change this to your actual endpoint
//         method: 'GET',
//         success: function(data) {
//             // Assuming data is in the format of RowDataPacket
//             $('#fullname').text(data.firstname + ' ' + data.lastname);
//             $('#fathername').text(data.fathername);
//             $('#birth').text(data.birth);
//             $('#phone').text(data.phone);
//             $('#addiction').text(data.addiction ? 'Yes' : 'No');
//             $('#nationality').text(data.nationality);
//             $('#religion').text(data.religion);
//             $('#address').text(data.address);
//             $('#description').text(data.description);
//             $('#public_code').text(data.public_code);
//         },
//         error: function(xhr, status, error) {
//             console.error('Error fetching data:', error);
//             $('.card-body').html('<p class="text-danger">Error fetching user information.</p>');
//         }
//     });
// });
// });


// $(document).ready(function() {
//   $('#searchForm').submit(function(event) {
//       event.preventDefault(); // Prevent the form from submitting normally

//       const searchTypeSelect = $('#searchTypeSelect').val();
//       const searchInput = $('#searchInput').val();

//       $.ajax({
//           url: '/search_advanced',
//           method: 'POST',
//           contentType: 'application/json',
//           data: JSON.stringify({ national_test: searchInput }),
//           success: function(response) {
//               if (response.message === 'Search successful') {
//                   displayResults(response.data);
//               } else {
//                   alert(response.error);
//               }
//           },
//           error: function() {
//               alert('Error fetching data. Please try again.');
//           }
//       });
//   });

  // function displayResults(data) {
  //     const tbody = $('#resultsTable tbody');
  //     tbody.empty(); // Clear previous results

  //     data.forEach(item => {
  //         tbody.append(`
  //             <tr>
  //                 <td>${item.first_name}</td>
  //                 <td>${item.last_name}</td>
  //                 <td>${item.email}</td>
  //                 <td>${item.phone}</td>
  //             </tr>
  //         `);
  //     });
  // }
// });
