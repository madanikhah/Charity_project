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

//   const searchInput =$('#search-input-container').find('input').val() ;
//   const searchType =  $('#search-type').val();
//   window.alert(searchInput+searchType);
//   $('#submit-search').click(async function() {
//     try {
//       const response = await fetch('/search_advanced', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({searchType, searchInput})
//       });
//       if (response.ok) {
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

//   function displaySearchResults(results) {
//     const table = $('<table>').addClass('table table-striped mt-3');
//     const headerRow = $('<tr>');
//     headerRow.append($('<th>').text('Last Name'));
//     headerRow.append($('<th>').text('Public Code'));
//     headerRow.append($('<th>').text('National Code'));
//     headerRow.append($('<th>').text('Donation'));
//     table.append(headerRow);

//     results.forEach(function(result) {
//       const row = $('<tr>');
//       row.append($('<td>').text(result.last_name));
//       row.append($('<td>').text(result.public_code));
//       row.append($('<td>').text(result.national_code));
//       row.append($('<td>').text(result.donation));
//       table.append(row);
//     });

//     $('#searchResults').empty().append(table);
//   }
// });



$(document).ready(function() {
  // Listen for changes in the search type selection
  $('#search-type').on('change', function() {
      const searchType = $(this).val();
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
          if (response.ok) {
            displaySearchResults(response);
            window.alert('کد پیداشده');
          } else {
            alert('No data found for the provided search criteria.');
          }
      } catch (error) {
          window.alert( error);
          //توجهههه$('#searchResults').html('<p>Error occurred while searching.</p>');
      }
  });
});
