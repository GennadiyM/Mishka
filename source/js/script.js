var mainNav = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');
var userList = document.querySelector('.user-list');

mainNav.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (mainNav.classList.contains('main-nav--opened')) {
      mainNav.classList.remove('main-nav--opened');
      mainNav.classList.add('main-nav--closed');
      userList.classList.add('user-list--closed');
  } else {
      mainNav.classList.remove('main-nav--closed');
      userList.classList.remove('user-list--closed');
      mainNav.classList.add('main-nav--opened');
  }
});