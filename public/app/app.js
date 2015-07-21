(function stayCreativeAppIIFE() {
  var app = angular.module('stayCreative', ['ngRoute']);

  app.config(function($routeProvider){
    $routeProvider
      .when('/', {
        controller: 'myPostsController as myPostsCtrl',
        templateUrl: 'app/views/welcome.html'
      }).when('/about', {
        controller: 'myPostsController as myPostsCtrl',
        templateUrl: 'app/views/about.html'
      }).when('/list', {
        controller: 'myPostsController as myPostsCtrl',
        templateUrl: 'app/views/myposts.html'
      }).when('/newpost', {
        controller: 'myPostsController as myPostsCtrl',
        templateUrl: 'app/views/newpost.html'
      }).when('/list/:id', {
        controller: 'myPostsController as myPostsCtrl',
        templateUrl: 'app/views/mypost.html'
      }).when('/edit/:id', {
        controller: 'myPostsController as myPostsCtrl',
        templateUrl: 'app/views/editpost.html'
      }).when('/register', {
        controller: 'authController as authCtrl',
        templateUrl: 'app/views/register.html'
      }).when('/login', {
        controller: 'authController as authCtrl',
        templateUrl: 'app/views/login.html'
      }).when('/firstaccess', {
        controller: 'authController as authCtrl',
        templateUrl: 'app/views/firstaccess.html'
      }).otherwise({redirectTo: '/'});
    });
  app.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
  });
})();





