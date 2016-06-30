(function() {

  angular
    .module('angularfireSlackApp')
    .factory('Channels', Channels);

  Channels.$inject = ['$firebaseArray'];

  function Channels($firebaseArray) {

    var ref = firebase.database().ref().child('channels');
    var channels = $firebaseArray(ref);

    return channels;


  };

})();