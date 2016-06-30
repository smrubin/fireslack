(function() {

  angular
    .module('angularfireSlackApp')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home/home.html',
        resolve: {
          'requireNoAuth': requireNoAuth
        }
      })
      .state('login', {
        url: '/login',
        controller: 'AuthCtrl as authCtrl',
        templateUrl: 'auth/login.html',
        resolve: {
          'requireNoAuth': requireNoAuth
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: 'users/profile.html',
        resolve: {
          'auth': auth,
          'profile': profile
        }
      })
      .state('channels', {
        url: '/channels',
        controller: 'ChannelsCtrl as channelsCtrl',
        templateUrl: 'channels/index.html',
        resolve: {
          'requireDisplayName': requireDisplayName,
          'channels': channels
        }
      })
      .state('channels.create', {
        url: '/create',
        templateUrl: 'channels/create.html',
        controller: 'ChannelsCtrl as channelsCtrl'
      })
      .state('channels.messages', {
        url: '/{channelId}/messages',
        controller: 'MessagesCtrl as messagesCtrl',
        templateUrl: 'messages/messages.html',
        resolve: {
          'messages': messages,
          'channelName': channelName
        }
      })
      .state('channels.direct', {
        url: '/{uid}/messages/direct',
        controller: 'MessagesCtrl as messagesCtrl',
        templateUrl: 'messages/messages.html',
        resolve: {
          'messages': userMessages,
          'channelName': messageName
        }
      })
      .state('register', {
        url: '/register',
        controller: 'AuthCtrl as authCtrl',        
        templateUrl: 'auth/register.html',
        resolve: {
          'requireNoAuth': requireNoAuth
        }
      });

    $urlRouterProvider.otherwise('/');
  };


  requireNoAuth.$inject = ['$state', 'Auth'];
  function requireNoAuth($state, Auth) {
    return Auth.$requireSignIn().then(function(auth) {
      $state.go('channels');
    }).catch(function(error) {
      return;
    });
  };


  auth.$inject = ['$state', 'Users', 'Auth'];
  function auth($state, Users, Auth) {
    return Auth.$requireSignIn().catch(function() {
      $state.go('home');
    });
  };

  profile.$inject = ['Users', 'Auth'];
  function profile(Users, Auth) {
    return Auth.$requireSignIn().then(function(auth) {
      console.log(auth.uid);
      return Users.getProfile(auth.uid).$loaded()
    });
  };

  channels.$inject = ['Channels'];
  function channels(Channels) {
    return Channels.$loaded();
  };

  requireDisplayName.$inject = ['$state', 'Auth', 'Users'];
  function requireDisplayName($state, Auth, Users) {
    return Auth.$requireSignIn().then(function(auth) {
      return Users.getProfile(auth.uid).$loaded().then(function(profile) {
        if(profile.displayName) {
          return profile;
        } else {
          $state.go('profile');
        }
      });
    }).catch(function(error) {
      $state.go('home');
    });
  };

  messages.$inject = ['$stateParams', 'Messages'];
  function messages($stateParams, Messages) {
    return Messages.forChannel($stateParams.channelId).$loaded();
  };

  channelName.$inject = ['$stateParams', 'channels'];
  function channelName($stateParams, channels) {
    return '#' + channels.$getRecord($stateParams.channelId).name;
  };

  userMessages.$inject = ['$stateParams', 'Messages', 'requireDisplayName'];
  function userMessages($stateParams, Messages, requireDisplayName) {
    return Messages.forUsers($stateParams.uid, requireDisplayName.$id).$loaded();
  };

  messageName.$inject = ['$stateParams', 'Users'];
  function messageName($stateParams, Users) {
    return Users.all.$loaded().then(function() {
      return '@' + Users.getDisplayName($stateParams.uid);
    });
  };


})();