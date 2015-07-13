(function stayCreativeAppIIFE() {
  var app = angular.module('stayCreative', ['ngRoute', 'app.controllers']);

  app.config(function($routeProvider){
    $routeProvider
      .when('/', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/myposts.html'
            }).when('/list', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/myposts.html'
            }).when('/newpost', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/newpost.html'
            }).when('/myposts/:id', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/mypost.html'
            }).when('/edit/:id', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/editpost.html'
      }).otherwise({redirectTo: '/'});
    });
})();

