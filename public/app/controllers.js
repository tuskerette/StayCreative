//Posts Controller
var myPostsController = function($http, $routeParams, $location) {
  this.newPost = {};
  this.newPost.characterPhotoUrl = "";
  this.myPosts = {};
  this.onePost = {};
  this.location = $location;
  this.http = $http;


  if($routeParams.id) {
    this.getOnePost($routeParams.id);
  } else {
    this.getAllPosts();
  };

};

myPostsController.prototype.addPost = function() {
  var self = this;
    this.http.post("/myposts/add", self.newPost)
    .success(function (data, status, headers, config) {
      console.log("Successfully posted");
      self.newPost = data;
      self.location.path("/myposts/" + data._id);
    })
    .error(function (data, status, headers, config) {
      switch(status) {
        case 401:
          self.message = "You must be authenticated!"
            break;
        case 500:
          self.message = "Something went wrong!";
          break;
      }
      console.log(data, status);
    });
};



myPostsController.prototype.getAllPosts = function() {
    var self = this;
     this.http.get("/myposts/myposts")
       .success(function(data, status, headers, config) {
         self.myPosts = data;
       })
       .error(function(data, status, headers, config) {
       //   switch(status) {
       //     case 401:
       //       self.message = "You must be authenticated!"
       //      break;
       //     case 500:
       //       self.message = "Something went wrong!";
       //      break;
       // }
         console.log(data, status);
      });
};

myPostsController.prototype.getOnePost = function(postId) {
var self = this;
this.http.get("/myposts/" + postId)
  .success(function(data, status, headers, config) {
      self.onePost = data;
     })
     .error(function(data, status, headers, config) {
       switch(status) {
         case 401:
           self.message = "You must be authenticated!"
          break;
         case 500:
           self.message = "Something went wrong!";
          break;
     }
       console.log(data, status);
    });
};

myPostsController.prototype.deletePost = function(postId) {
var self = this;
this.http.delete("/myposts/" + postId)
  .success(function(data, status, header, config) {
    alert("Post successfully deleted");
    self.location.path("/list");
  })
  .error(function(data, status, headers, config) {
    switch(status) {
      case 401:
        self.message = "You must be authenticated!"
        break;
      case 500:
        self.message = "Something went wrong!";
        break;
    }
      console.log(data, status);
  });
};

myPostsController.prototype.editPost = function(postId) {
  var self = this;
    this.http.get("/myposts/" + postId)
    .success(function (data, status, headers, config) {
      self.location.path("/edit/" + data._id);
    })
    .error(function (data, status, headers, config) {
      switch(status) {
        case 401:
          self.message = "You must be authenticated!"
            break;
        case 500:
          self.message = "Something went wrong!";
          break;
      }
      console.log(data, status);
    });
};

myPostsController.prototype.updatePost = function(postId, editedPost) {
  var self = this;
    this.http.patch("/myposts/" + postId, editedPost)
    .success(function (data, status, headers, config) {
      self.location.path("/myposts/" + data._id);
      console.log("data is " + data);
    })
    .error(function (data, status, headers, config) {
      switch(status) {
        case 401:
          self.message = "You must be authenticated!"
            break;
        case 500:
          self.message = "Something went wrong!";
          break;
      }
      console.log(data, status);
    });
};


angular.module('app.controllers', [])
  .controller('myPostsController', myPostsController)



