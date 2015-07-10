var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myPostSchema = new Schema({
  characterName: String,
  characterBio: String,
  characterCreation: String,
  characterPhotoUrl: String,
  creationPhotoUrl: String,
  songURL: String,
  postedDate: {
      type: Date
    },
  editedDate: {
      type: Date
    }
});

module.exports = mongoose.model('MyPost', myPostSchema);
