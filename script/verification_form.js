    async function handleVerificationFormSubmit() {
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
       // let national_verification =  nationalCodeInput.value.toString().slice(1);
       let national =  nationalCodeInput.value.toString().slice(1);
        try {
          // Check the national code with the backend
          const response = await fetch('/search_verification', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({national})
          });
      
          if (response.ok) {
            const data = await response.json();
              $('form').hide();
              $('#verification-fill-form').show();
             // handleVerificationFillFormSubmit(result);
           
          } else {
            alert('متقاضی یافت نشد');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('مشکل ارتباط با پایگاه داده');
        }
      }
    );}


    function handleVerificationFillFormSubmit(result){}
