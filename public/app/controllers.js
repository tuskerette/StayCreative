  var myPostsController = function($http, $routeParams) {
    this.newPost = {};
    this.myposts = {};
    this.onepost = {};
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

  myPostsController.prototype.getAllPosts = function() {
      var mps = this;
       this.http.get("/myposts/myposts")
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

   myPostsController.prototype.getOnePost = function(postId) {
    var op = this;
    this.http.get("/myposts/" + postId)
      .success(function(data, status, headers, config) {
           op.onepost = data;
           console.log(op.onepost);
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


angular.module('app.controllers', ['app.directives'])
  .controller('myPostsController', myPostsController)




  // .controller('myPostsController', function($http) {
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

  // })





// CONTROLLER FOR STATIC PAGES
  // .controller('StaticPageController', ['$scope', '$routeParams', '$http', function($scope, $routeParams, $http){
  //   $http.get('static_pages/static_pages.json').success(function(data){
  //     $scope.page = data[$routeParams.id];
  //   })

  // }]);
