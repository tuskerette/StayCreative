var myPostsController = function($http, $routeParams, $location) {
  this.newPost = {};
  this.myPosts = {};
  this.onePost = {};
  this.location = $location;
  this.http = $http;

  if ($routeParams.id) {
    this.getOnePost($routeParams.id);
  } else {
    this.getAllPosts();
  }
};

myPostsController.prototype.addPost = function() {
  var self = this;
    this.http.post("/myposts/add", self.newPost)
    .success(function (data, status, headers, config) {
      console.log("Successfully posted");
      self.onePost = data;
      self.location.path("/myposts/"+data._id);
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

myPostsController.prototype.getAllPosts = function() {
    var mps = this;
     this.http.get("/myposts/myposts")
       .success(function(data, status, headers, config) {
         mps.myPosts = data;
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

myPostsController.prototype.getOnePost = function(postId) {
var op = this;
this.http.get("/myposts/" + postId)
  .success(function(data, status, headers, config) {
      op.onePost = data;
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

myPostsController.prototype.deleteOnePost = function(postId) {
var self = this;
this.http.delete("/myposts/" + postId)
  .success(function(data, status, header, config) {
    alert("Post successfully deleted");
    self.location.path("/");
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

myPostsController.prototype.editOnePost = function(postId) {


};


angular.module('app.controllers', ['app.directives'])
  .controller('myPostsController', myPostsController)



// CONTROLLER FOR STATIC PAGES
  // .controller('StaticPageController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
  //   $http.get('static_pages/static_pages.json').success(function(data){
  //     $scope.page = data[$routeParams.id];
  //   })

  // }]);
