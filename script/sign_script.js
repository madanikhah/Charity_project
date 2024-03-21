//   ابتدا با استفاده از CSS، دو کلاس background-overlay و signin-modal
//    را برای Modal تعریف کرده ایم. سپس با استفاده از تگ div،
//    دو div با کلاس های مذکور را به عنوان پس زمینه Modal و Modal
//     اصلی ایجاد کرده ایم.

// در نهایت، با استفاده از JavaScript، وقتی دکمه "Sign In"
//  فشرده شد، Modal را نمایش می دهیم و وقتی
//  روی پس زمینه کلیک شد، Modal را مخفی می کنیم.


const signinIcon = document.getElementById('signin-icon');
const backgroundOverlay = document.getElementById('background-overlay');
const signinModal = document.getElementById('signin-modal');

signinIcon.addEventListener('click', () => {
  backgroundOverlay.style.display = 'block';
  signinModal.style.display = 'block';
});

backgroundOverlay.addEventListener('click', () => {
  backgroundOverlay.style.display = 'none';
  signinModal.style.display = 'none';
});

// const signinButton = document.getElementById('signin-button');
//       const backgroundOverlay = document.getElementById('background-overlay');
//       const signinModal = document.getElementById('signin-modal');

//       signinButton.addEventListener('click', () => {
//         backgroundOverlay.style.display = 'block';
//         signinModal.style.display = 'block';
//       });

//       backgroundOverlay.addEventListener('click', () => {
//         backgroundOverlay.style.display = 'none';
//         signinModal.style.display = 'none';
//       });


// when click ثبت نام go to sign_up page
const domesticFlightButton = document.querySelector('#sign_up_button');

    domesticFlightButton.addEventListener('click', () => {
      window.location.href = 'sign_up.html';
    });