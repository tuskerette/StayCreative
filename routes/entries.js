var express = require('express');
var router = express.Router();
// var moment = require('moment');
var Entry = require('../models/entries');

router.get('/', function(req, res) {
  Entry.find( function(err, entries, count) {
    res.render('list', {entries: entries});
  })
});

router.post('/', function(req, res) {
    new Entry({
      characterName: req.body.characterName,
      characterBio: req.body.characterBio,
      characterCreation: req.body.characterCreation,
      characterPhoto: req.body.characterPhoto,
      creationPhoto: req.body.creationPhoto,
      song: req.body.song,
      postedDate: req.body.postedDate

    }).save(function(err, entry, count) {
      if(err) {
        res.status(400).send('Error saving new entry: ' + err);
      } else {
        res.send("New entry created");
      }
    })
});

router.get('/add', function(req, res) {
  res.render('add', {entry: {}});
});

router.route('/:entry_id')
  .all(function(req, res, next) {
    entry_id = req.params.entry_id;
    entry = {};
    Entry.findById(entry_id, function(err, n) {
      entry = n;
      next();
    });
  })

  // .get(function(req, res) {
  //   res.render('edit', {entry: entry, moment: moment});
  // })

  // // .post(function(req, res) {
  // //   entry.notes.push({
  // //     note: req.body.notes
  // //   });

  //   entry.save(function(err, entry, count) {
  //     if(err) {
  //       res.status(400).send('Error adding note: ' + err);
  //     } else {
  //       res.send('Note added!');
  //     }
  //   });
  // })




// PUT IS NOT WORKING, FIX ITTTTT!!!!!!

  // .put(function(req, res) {
  //   characterName: req.body.characterName,
  //   characterBio: req.body.characterBio,
  //   characterCreation: req.body.characterCreation,
  //   characterPhoto: req.body.characterPhoto,
  //   creationPhoto: req.body.creationPhoto,
  //   song: req.body.song,

  //   entry.save(function(err, entry, count) {
  //     if(err) {
  //       res.status(400).send('Error saving entry: ' + err);
  //     } else {
  //       res.send('Entry edited successfully');
  //     }
  //   });
  // })

  .delete(function(req, res) {
    entry.remove(function(err, entry) {
      if(err) {
        res.status(400).send("Error removing entry: " + err);
      } else {
        res.send('Entry removed successfully');
      }
    });
  });

module.exports = router;
