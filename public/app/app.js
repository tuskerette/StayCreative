(function stayCreativeAppIIFE() {
  var app = angular.module('stayCreative', ['ngRoute']);

  app.controller('myPostsController', function($http) {
    this.myPostsArray = myPostsArray;
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


  });

  var myPostsArray = [{
    characterName: 'Pandoro Silvestre',
    characterBio: 'Pandoro Silvestre is an Italian salesman. He is 48 years old. He runs a flea market store in Medford, MA.',
    characterCreation: 'Pandoro invented the postcard with sounds. He types a message that turns into a melody',
    characterPhotoUrl: 'http://www.smallflower.com/prodimages/223421-DEFAULT-m.jpg'
  },
  {
    characterName: 'Gino Pino',
    characterBio: 'Gino Pino is from Pisa, Italy.',
    characterCreation: 'He created the RFID tea steeping. When the song has ended, your tea bag has steeped long enough. The RFID is in the teabag tag, with a picture of the song cover. TheRFID reader is where you place you mug. Very successful project, still in use today.'
  },
  {
    characterName: 'Test Osterone',
    characterBio: 'The Osterones is a big family from Sardinia.',
    characterCreation: 'Test invented the russian roulette with mallo cups.',
    creationPhotoUrl: 'https://upload.wikimedia.org/wikipedia/en/3/35/Mallo-Cup-Wrapper-Small.jpg'
  }]

  app.config(function($routeProvider){
    $routeProvider
      .when('/', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/welcome.html'
            }).
      when('/myposts', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/myposts.html'
            }).
      when('/newpost', {
              controller: 'myPostsController as myPostsCtrl',
              templateUrl: 'app/views/newpost.html'
            }).
      when('/myposts/:id', {
              controller: "myPostsController as myPostsCtrl",
              templateUrl: "app/views/mypost.html"
     }).
      otherwise({redirectTo: '/myposts'});
  });

})();

