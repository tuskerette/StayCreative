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


  var getUser = function() {
    // console.log("we are in get user");
      var url = '/auth/user';
        return $http.get(url)
          .success(function(res){
          if (res.message === "unAuthenticated"){
             // $location.path('/');
          } else {
            setUser(res);
          }
        }).error(function(err){
            // $location.path('/');
        });
      };


  getUser();


};


angular.module('app.authcontroller', [])
  .controller('authController', authController)
