(function() {
  angular
    .module('angularfireSlackApp')
    .controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['$state', 'md5', 'auth', 'profile'];

  function ProfileCtrl($state, md5, auth, profile) {
    
    var profileCtrl = this;

    profileCtrl.updateProfile = updateProfile;
    profileCtrl.profile = profile;

    function updateProfile() {
      profileCtrl.profile.emailHash = md5.createHash(auth.email);
      profileCtrl.profile.$save().then(function() {
        $state.go('channels');
      });
    };

  };

})();