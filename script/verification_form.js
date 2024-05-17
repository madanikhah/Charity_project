  
  
    // function validateFormData(data) {
    //   let isValid = true;
    
    //   // Validate the national code
    //   if (!isNumericOnly(data.national_code)) {
    //     alert('National code should only contain numbers.');
    //     isValid = false;
    //   }
    
    //   return isValid;
    // }
    // function handleVerificationFormSubmit() {
    //     const form = document.getElementById('verification-form');
      
    //     form.addEventListener('submit', async (event) => {
    //       event.preventDefault();
    //       // Validate the form data
    //       if (!validateFormData(data)) {
    //         return; // Return if the data is invalid
    //       }
    //       const national_code = document.getElementById('nationalcode-verification-id').value;
      
    //          try {
    //         const response = await fetch('/submit_verification_form', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json'
    //           },
    //           body: JSON.stringify({ national_code })
    //         });
        
    //         if (response.ok) {
    //           const data = await response.json();
              
    //           window.alert("متقاضی با موفقیت شناسایی شد!");
    //           window.location.href = '/';
    //         } else {
    //         //   const { error } = await response.json();
    //           window.alert("متقاضی تعریف نشده است!");
    //           // Display an error message to the user
    //         }
    //       } catch (error) {
    //         console.error('Error:', error);
    //         // Display a general error message to the user
    //       }
    //     });
    //     }
    

    async function handleVerificationCodeSubmit() {
        const verificationForm = document.getElementById('verification-form');
        // const form = document.getElementById('verification-form');

        verificationForm.addEventListener('submit', async (event) => {
            event.preventDefault();
                  // Validate the form data
            const nationalCodeInput = document.getElementById('nationalcode-verification-id');

        // Check if the national code has 10 digits
        if (nationalCodeInput.value.length !== 10 || !/^\d+$/.test(nationalCodeInput.value)) {
          alert('National code must be 10 digits long and contain only numbers.');
          return;
        }
      
        try {
          // Check the national code with the backend
          const response = await fetch('/search_verification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nationalCodeInput })
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
      }
    );}
