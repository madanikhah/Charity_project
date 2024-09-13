
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
            const inputField = $('<input>')
                .attr('type', 'text')
                .attr('name', 'search-input')
                .attr('placeholder', 'جستجو کنید...')
                .addClass('form-control');
  
            searchInputContainer.append(inputLabel).append(inputField);
            // ++++++
            searchInputContainer.show();
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
                $('#education_id').text(data.education);
                $('#national_code').text(convertToPersianNumbers(data.message.national_code));
                $('#result_evaluation_id').text(data.message.result_evaluation_id);
                $('#bimeh_id').text(data.message.bimeh_id);
                $('#nationality').text(data.message.nationality);
                $('#religion').text(data.message.religion ==1 ?'بله': 'خیر');
                $('#martial_id').text(data.message.martial_id==1 ?'مجرد':(data.message.martial_id==2 ? 'متاهل':'مطلقه'));
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
                
                $('#no-results-message').hide();
                $('#results-container').show(); // Add this line to display the results
                $('html, body').animate({
                    scrollTop: $('#results-container').offset().top
                }, 500);
              // window.alert('کد پیداشده');
            } else {
                // $('#results-container').hide(); // Hide results container
                // $('#results-container').empty(); // Clear any previous content
                // $('#no-results-message').show(); // Add this line to display the results

              alert('متقاضی یافت نشد!');
            }
        } catch (error) {
            $('#results-container').hide(); // Hide results container
            $('#results-container').empty(); // Clear any previous content
            $('#no-results-message').show(); // Add this line to display the results
            $('html, body').animate({
                scrollTop: $('#no-results-message').offset().top
            }, 500);
            // window.alert( "مشکلی رخ داده است!");
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
  
  
    function displaySearchResults(results) {
      window.alert("jythrgtefdwasxdcwfvgerbhyt");
      
    }
  
