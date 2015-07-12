var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var myPostSchema = new Schema({
  characterName: String,
  characterBio: String,
  characterPhotoUrl: String,
  invention: String,
  songUrl: String,
  postedDate: {
      type: Date
    },
  editedDate: {
      type: Date
    }
});

module.exports = mongoose.model('MyPost', myPostSchema);
