(function stayCreativeAppIIFE() {
  var app = angular.module('stayCreative', ['ngRoute', 'app.controllers']);

  // app.controller('myPostsController', function($http) {
  //   this.newPost = {};
  //   var self = this;
  //   this.addPost = function() {

  //     $http.post("/myposts/add", self.newPost)
  //     .success(function (data, status, headers, config) {
  //       console.log("posted successfully");
  //       this.message = "The post was created successfully!";
  //     })
  //     .error(function (data, status, headers, config) {
  //       switch(status) {
  //         case 401:
  //           this.message = "You must be authenticated!"
  //             break;
  //         case 500:
  //           this.message = "Something went wrong!";
  //           break;
  //       }
  //       console.log(data, status);
  //     });
  //   };

  //   this.myposts = {};
  //   var mps = this;
  //   var getAllPosts = function() {
  //      $http.get("/myposts/myposts")
  //        .success(function(data, status, headers, config) {
  //          mps.myposts = data;
  //        })
  //        .error(function(data, status, headers, config) {
  //          switch(status) {
  //            case 401:
  //              this.message = "You must be authenticated!"
  //             break;
  //            case 500:
  //              this.message = "Something went wrong!";
  //             break;
  //        }
  //          console.log(data, status);
  //       });
  //   };
  //    getAllPosts();

  // });

  app.config(function($routeProvider){
    $routeProvider
      .when('/', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/welcome.html'
            }).when('/myposts', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/myposts.html'
            }).when('/newpost', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/newpost.html'
            }).when('/myposts/:id', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/mypost.html'
            }).when('/static_page/:id', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/static_page.html'
      }).otherwise({redirectTo: '/'});
    });
})();

