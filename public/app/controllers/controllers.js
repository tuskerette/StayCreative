//Posts Controller
(function myPostsControllerIIFE(){
var myPostsController = function($http, $routeParams, $location, $scope, appSettings, pdfFactory) {
  this.newPost = {};
  this.newPost.characterPhotoUrl = "";
  this.myPosts = {};
  this.onePost = {};
  this.location = $location;
  this.http = $http;
  this.appSettings = appSettings;

  this.uploadFile = function(target){
    var file = target.files[0];
    var imageLink ="";
    /* Is the file an image? */
    if (!file || !file.type.match(/image.*/)) return;
    document.body.className = "uploading";
    var fd = new FormData();
    fd.append("image", file); // Append the file
    fd.append("key", "6528448c258cff474ca9701c5bab6927"); // Get your own key http://api.imgur.com/

    var controller = this;
    $.ajax({
      method: 'POST',
      url: "http://api.imgur.com/2/upload.json",
      data: fd,
      processData: false,
      contentType: false
    }).success(function(response){
      console.log(this);
        var link = response.upload.links.imgur_page;
        document.querySelector("#link").href = link;
        document.querySelector("#link").innerHTML = link;
        var imageLink = ""+document.querySelector("#link").innerHTML.replace("http://imgur.com/", "http://i.imgur.com/")+".jpg";
        controller.newPost.characterPhotoUrl = imageLink;
        $('#characterPhotoUrl').html("{{myPostsCtrl.newPost.characterPhotoUrl }}" +imageLink+ "");
        $('#imagePreview').html("<img src=" + imageLink + ">");
        document.body.className = "uploaded";
    });

};



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



myPostsController.$inject = ['$http','pdfFactory', 'appSettings'];

angular.module('stayCreative').controller('myPostsController', myPostsController)

})();



