(function() {
  var app = angular.module('stayCreative', [ ]);

  app.controller('entryController', function() {
    this.dailypost = dailypost;
  });

  var dailypost = {
    characterName: 'Pandoro Silvestre',
    characterBio: 'Pandoro Silvestre is an Italian salesman. He is 48 years old. He runs a flea market store in Medford, MA.',
    characterCreation: 'Pandoro invented the postcard with sounds. He types a message that turns into a melody'
  }

})();

