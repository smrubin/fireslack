(function() {

  angular
    .module('angularfireSlackApp')
    .factory('Messages', Messages);

  Messages.$inject = ['$firebaseArray'];

  function Messages($firebaseArray) {

    var channelMessagesRef = firebase.database().ref().child('channelMessages');
    var userMessagesRef = firebase.database().ref().child('userMessages');

    return {
      forChannel: forChannel,
      forUsers: forUsers
    }

    function forChannel(channelId) {
      return $firebaseArray(channelMessagesRef.child(channelId));
    }

    function forUsers(uid1, uid2) {
      var path = uid1 < uid2 ? uid1 + '/' + uid2 : uid2 + '/' + uid1;
      return $firebaseArray(userMessagesRef.child(path));
    };

  };


})();