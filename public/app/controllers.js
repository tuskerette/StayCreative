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
      // self.onePost = data;
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
    self.location.path("/");
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


// Auth Controller
var authController = function($http, $routeParams, $location) {
var currentUser = false;
this.newUser = {};
this.returningUser = {};
this.location = $location;
this.http = $http;

  authController.prototype.registerUser = function() {
    var self = this;
    this.http.post("/auth/register", self.newUser)
    .success(function (data, status, headers, config) {
        console.log("Successfully registered");
        self.newUser = data;
        self.location.path("/myposts");
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

  authController.prototype.loginUser = function() {
    var self = this;
    this.http.post("/auth/login", self.returningUser)
    .success(function (data, status, headers, config) {
        console.log("Successfully logged in");
        self.returningUser = data;
        setUser(self.returningUser);
        self.location.path("/list");
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

  authController.prototype.logoutUser = function() {
    var self = this;
    this.http.get("/auth/logout")
    .success(function (data, status, headers, config) {
        console.log("Successfully logged out");
        currentUser = false;
        self.location.path("/");
      })
      .error(function (data, status, headers, config) {
        switch(status) {
          case 500:
            self.message = "Something went wrong!";
            break;
        }
        console.log(data, status);
      });
  };

  var setUser = function(data) {
    currentUser = data;
  };

  authController.prototype.isLoggedIn = function() {
    // console.log(currentUser);
    return(currentUser)? currentUser : false;
  };


};

angular.module('app.controllers', [])
  .controller('authController', authController)
  .controller('myPostsController', myPostsController)


