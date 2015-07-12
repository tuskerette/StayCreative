angular.module('app.controllers', ['app.directives'])
  .controller('myPostsController', function($http) {
    this.newPost = {};
    var self = this;
    this.addPost = function() {

      $http.post("/myposts/add", self.newPost)
      .success(function (data, status, headers, config) {
        console.log("posted successfully");
        this.message = "The post was created successfully!";
      })
      .error(function (data, status, headers, config) {
        switch(status) {
          case 401:
            this.message = "You must be authenticated!"
              break;
          case 500:
            this.message = "Something went wrong!";
            break;
        }
        console.log(data, status);
      });
    };

    this.myposts = {};
    var mps = this;
    var getAllPosts = function() {
       $http.get("/myposts/myposts")
         .success(function(data, status, headers, config) {
           mps.myposts = data;
         })
         .error(function(data, status, headers, config) {
           switch(status) {
             case 401:
               this.message = "You must be authenticated!"
              break;
             case 500:
               this.message = "Something went wrong!";
              break;
         }
           console.log(data, status);
        });
    };
     getAllPosts();

  })
  .controller('StaticPageController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
    $http.get('static_pages/static_pages.json').success(function(data){
      $scope.page = data[$routeParams.id];
    })

  }]);
