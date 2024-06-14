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
