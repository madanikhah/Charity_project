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
  
    $('#req').click(function() {
      $('form').hide();
      $('#req-form').show();
      handleReqFormSubmit();
    });
  
    $('#verification').click(function() {
      $('form').hide();
      $('#verification-form').show();
      handleVerificationFormSubmit();
    });
  
    $('#search-verification-id').click(function() {
      $('form').hide();
      $('#verification-fill-form').show();
      handleVerificationFillFormSubmit();
    });

    $('#test').click(function() {
        $('form').hide();
        $('#test-form').show();
        handleTestFormSubmit();
      });
// ++
      $('#test-search').click(function() {
        $('form').hide();
        $('#test-fill-form').show();
        handleVerificationFillFormSubmit();
      });

      $('#interview').click(function() {
        $('form').hide();
        $('#interview-form').show();
        handleTestFormSubmit();
      });

      $('#interview-search').click(function() {
        $('form').hide();
        $('#interview-fill-form').show();
        handleVerificationFillFormSubmit();
      });


      $('#mali').click(function() {
        $('form').hide();
        $('#mali-form').show();
        handleTestFormSubmit();
      });

      $('#mali-search').click(function() {
        $('form').hide();
        $('#mali-fill-form').show();
        handleVerificationFillFormSubmit();
      });

      $('#enfagh').click(function() {
        $('form').hide();
        $('#enfagh-form').show();
        handleTestFormSubmit();
      });

      // $('#enfagh-search').click(function() {
      //   $('form').hide();
      //   $('#mali-fill-form').show();
      //   handleVerificationFillFormSubmit();
      // });


      // $('#test-search').click(function() {
      //   $('form').hide();
      //   $('#test-fill-form').show();
      //   handleVerificationFillFormSubmit();
      // });

    // $('#trust').click(function() {
    //   $('form').hide();
    //   $('#trust-form').show();
    //   handleTrustFormSubmit();
    // });
  
    // Add similar event listeners for other forms...
  
  });
