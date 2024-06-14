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


$(document).ready(function() {
  $('#searchForm').submit(function(event) {
    event.preventDefault();

    const searchData = {
      searchType: $('#search-type').val(),
      searchTerm: $('#search-term').val()
    };

    $.ajax({
      type: 'POST',
      url: '/search',
      data: JSON.stringify(searchData),
      contentType: 'application/json',
      success: function(response) {
        displaySearchResults(response);
      },
      error: function(err) {
        console.error('Error:', err);
      }
    });
  });

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
