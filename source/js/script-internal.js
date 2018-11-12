var mainNavInt = document.querySelector('.main-nav-internal');
var navToggleInt = document.querySelector('.main-nav-internal__toggle');
var userListInt = document.querySelector('.user-list-internal');

mainNavInt.classList.remove('main-nav-internal--nojs');

navToggleInt.addEventListener('click', function() {
  if (mainNavInt.classList.contains('main-nav-internal--opened')) {
      mainNavInt.classList.remove('main-nav-internal--opened');
      mainNavInt.classList.add('main-nav-internal--closed');
      userListInt.classList.add('user-list-internal--closed');
  } else {
      mainNavInt.classList.remove('main-nav-internal--closed');
      userListInt.classList.remove('user-list-internal--closed');
      mainNavInt.classList.add('main-nav-internal--opened');
  }
});
