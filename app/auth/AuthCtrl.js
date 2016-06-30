(function() {
  angular
    .module('angularfireSlackApp')
    .controller('AuthCtrl', AuthCtrl);

  AuthCtrl.$inject = ['Auth', '$state'];

  function AuthCtrl(Auth, $state) {
      
    var authCtrl = this;

    authCtrl.login = login;
    authCtrl.register = register;

    authCtrl.user = {
      email: '',
      password: ''
    };

    function login() {
      Auth.$signInWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function(authData) {
        console.log('Logged in as: ', authData.uid);
        $state.go('home');
      }).catch(function(error) {
        authCtrl.error = error;
      });
    };

    function register() {
      Auth.$createUserWithEmailAndPassword(authCtrl.user.email, authCtrl.user.password).then(function(userData) {
        console.log('User ' + userData.uid + ' created successfully.');
        authCtrl.login();
      }).catch(function(error) {
        authCtrl.error = error;
      });
    };

  };

})();