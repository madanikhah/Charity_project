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

  $('#trust').click(function() {
    $('form').hide();
    $('#trust-form').show();
    handleTrustFormSubmit();
  });

  // Add similar event listeners for other forms...

});
