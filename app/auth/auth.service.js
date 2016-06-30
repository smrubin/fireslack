(function() {
  'use strict';

  angular
    .module('angularfireSlackApp')
    .factory('Auth', Auth);

  Auth.$inject = ['$firebaseAuth'];

  function Auth($firebaseAuth) {
    var auth = $firebaseAuth();
    return auth;
  }

})();