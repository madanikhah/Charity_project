const searchTypeSelect = document.getElementById('search-type');
const searchInputContainer = document.getElementById('search-input-container');

searchTypeSelect.addEventListener('change', function() {
  searchInputContainer.innerHTML = '';
  switch (this.value) {
    case 'public-code':
      searchInputContainer.innerHTML = '<label for="public-code">کد عمومی</label><input type="text" class="form-control" id="public-code" name="public-code">';
      break;
    case 'last-name':
      searchInputContainer.innerHTML = '<label for="last-name">نام خانوادگی</label><input type="text" class="form-control" id="last-name" name="last-name">';
      break;
    // case 'year-of-birth':
    //   searchInputContainer.innerHTML = '<label for="year-of-birth">Year of Birth:</label><input type="number" class="form-control" id="year-of-birth" name="year-of-birth">';
    //   break;
    case 'mobile-phone':
      searchInputContainer.innerHTML = '<label for="mobile-phone">تلفن همراه</label><input type="tel" class="form-control" id="mobile-phone" name="mobile-phone">';
      break;
      
  }
});

try {
  // Check the national code with the backend
  const response = await fetch('/search_advanced', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ searchTypeSelect, searchInputContainer })
  });

  if (response.ok) {
    const data = await response.json();
    
    window.alert('کد پیداشده');
    // If there is a code in the forms, open another form
    // if (data.hasCode) {
    //   verificationForm.style.display = 'none';
    //   const codeForm = document.getElementById('code-form');
    //   codeForm.style.display = 'block';

    //   const dateInput = document.getElementById('date');
    //   const resultInput = document.getElementById('result');

    //   dateInput.value = data.date;
    //   resultInput.value = data.resultCallId;

    //   codeForm.addEventListener('submit', async (event) => {
    //     event.preventDefault();

    //     try {
    //       const codeResponse = await fetch('/submit_code_form', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({ date: dateInput.value, result: resultInput.value })
    //       });

    //       if (codeResponse.ok) {
    //         const codeData = await codeResponse.json();
    //         alert('Form submitted successfully!');
    //         // Redirect or perform other actions
    //       } else {
    //         alert('Error submitting the form.');
    //       }
    //     } catch (error) {
    //       console.error('Error:', error);
    //       alert('An error occurred while submitting the form.');
    //     }
    //   });
    // } else {
    //   alert('No code found for the provided national code.');
    // }
  } else {
    alert('Error checking the national code with the backend.');
  }
} catch (error) {
  console.error('Error:', error);
  alert('An error occurred while checking the national code.');
}

  function displaySearchResults(results) {
    const table = $('<table>').addClass('table table-striped mt-3');
    const headerRow = $('<tr>');
    headerRow.append($('<th>').text('Last Name'));
    headerRow.append($('<th>').text('Public Code'));
    headerRow.append($('<th>').text('National Code'));
    headerRow.append($('<th>').text('Donation'));
    table.append(headerRow);

    results.forEach(function(result) {
      const row = $('<tr>');
      row.append($('<td>').text(result.last_name));
      row.append($('<td>').text(result.public_code));
      row.append($('<td>').text(result.national_code));
      row.append($('<td>').text(result.donation));
      table.append(row);
    });

    $('#searchResults').empty().append(table);
  }
});
