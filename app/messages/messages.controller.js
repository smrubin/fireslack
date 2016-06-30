(function() {

  angular
    .module('angularfireSlackApp')
    .controller('MessagesCtrl', MessagesCtrl);

  MessagesCtrl.$inject = ['requireDisplayName', 'channelName', 'messages'];

  function MessagesCtrl(requireDisplayName, channelName, messages) {

    var messagesCtrl = this;

    messagesCtrl.messages = messages;
    messagesCtrl.channelName = channelName;

    messagesCtrl.message = '';

    messagesCtrl.sendMessage = sendMessage;

    function sendMessage() {
      if(messagesCtrl.message.length > 0) {
        messagesCtrl.messages.$add({
          uid: requireDisplayName.$id,
          body: messagesCtrl.message,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(function() {
          messagesCtrl.message = '';
        });
      }
    };

  };

})();