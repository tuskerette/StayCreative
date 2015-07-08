var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var entrySchema = new Schema({
  characterName: String,
  characterBio: String,
  characterCreation: String,
  characterPhoto: String,
  creationPhoto: String,
  song: String,
  postedDate: {
      type: Date,
      'default': Date.now
    },



});

module.exports = mongoose.model('Entry', entrySchema);
