  function validateFormData(data) {
    let isValid = true;
  
    // Validate the first name
    if (!isNameValid(data.firstname)) {
      alert('First name should only contain letters.');
      isValid = false;
    }
  
    // Validate the last name
    if (!isNameValid(data.lastname)) {
      alert('Last name should only contain letters.');
      isValid = false;
    }
  
    // Validate the father's name
    if (!isNameValid(data.fathername)) {
      alert('Father\'s name should only contain letters.');
      isValid = false;
    }
  
    // Validate the national code
    if (!isNumericOnly(data.national_code)) {
      alert('National code should only contain numbers.');
      isValid = false;
    }
  
    // Validate the phone number
    if (!isNumericOnly(data.phone)) {
      alert('Phone number should only contain numbers.');
      isValid = false;
    }
  
    return isValid;
  }
  
  function isNameValid(name) {
    // Check if the name only contains letters
    return /^[a-zA-Z\s]+$/.test(name);
  }
  
  function isNumericOnly(value) {
    // Check if the value only contains numbers
    return /^\d+$/.test(value);
  }
  
  function handleReqFormSubmit() {
    const form = document.getElementById('req-form');
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const firstname = document.getElementById('firstname-req-id').value;
      const lastname = document.getElementById('lastname-req-id').value;
      const fathername = document.getElementById('fathername-req-id').value;
      const national_code = document.getElementById('national-code-req-id').value;
      const birth = document.getElementById('birth-req-id').value;
      const phone = document.getElementById('phone-req-id').value;
      const representative = document.getElementById('representative-req-id').value;
      const date = document.getElementById('date-req-id').value;
      const level = document.getElementById('level-req-id').value;
  
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
          window.alert("ثبت شد");
          window.location.href = '/home';
        } else {
          window.alert("مشکلی پیش آمده");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  }
