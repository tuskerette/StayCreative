var express = require('express');
var router = express.Router();
// var moment = require('moment');
var MyPosts = require('../models/myposts');

router.get('/', function(req, res) {
  MyPosts.find( function(err, myposts, count) {
    res.render('list', {myposts: myposts});
  })
});

router.post('/add', function(req, res) {
    new MyPosts({
      characterName: req.body.characterName,
      characterBio: req.body.characterBio,
      characterCreation: req.body.characterCreation,
      characterPhotoUrl: req.body.characterPhoto,
      creationPhotoUrl: req.body.creationPhoto,
      song: req.body.song,
      postedDate: req.body.postedDate

    }).save(function(err, mypost) {
      if(err) {
        res.status(400).send('Error saving new post: ' + err);
      } else {
        res.send("New post created");
      }
    })
});

router.get('/add', function(req, res) {
  res.render('add', {mypost: {}});
});

router.route('/:mypost_id')
  .all(function(req, res, next) {
    mypost_id = req.params.mypost_id;
    mypost = {};
    MyPosts.findById(mypost_id, function(err, n) {
      mypost = n;
      next();
    });
  })






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
    mypost.remove(function(err, mypost) {
      if(err) {
        res.status(400).send("Error removing post: " + err);
      } else {
        res.send('Post removed successfully');
      }
    });
  });

module.exports = router;
