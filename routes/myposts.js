var express = require('express');
var router = express.Router();
var MyPosts = require('../models/myposts');
var Account = require('../models/account');

// GET request to show all the posts
router.get('/myposts', function(req, res) {
  MyPosts.find(function(err, myposts) {
    if(err) {
      res.status(500).send("Error finding all posts: " + err);
    } else {
      res.json(myposts);
    }
  })
});

// POST request to add a new post to the db.
router.post('/add', function(req, res) {
    MyPosts.create({
      characterName: req.body.characterName,
      characterBio: req.body.characterBio,
      characterPhotoUrl: req.body.characterPhotoUrl,
      invention: req.body.invention,
      postedDate: Date.now()
    },function(err, mypost) {
      if(err) {
        res.status(500).send("Error saving new post: " + err);
      } else {
        // console.log("the current user is, see below");
        // console.log(req.user._id);
        Account.findByIdAndUpdate(req.user._id, { $push: {userPosts: mypost._id} }, function(err, user) {
          if(err) {
            console.log("error");
          } else {
            console.log("saved post id to user");

            // user.userPosts.push(mypost._id);
          }
        })
        res.json(mypost);
      }
    });
});


// Routes for post by :id
router.route('/:mypost_id')
  .all(function(req, res, next) {
    res.locals.mypost_id = req.params.mypost_id;

    MyPosts.findById(res.locals.mypost_id, function(err, post) {
      res.locals.mypost = post;
      next();
    });
  }).get(function(req, res) {
    res.status(200).json(res.locals.mypost);
  }).patch(function(req, res) {
    var mp = res.locals.mypost;
    mp.characterName = req.body.characterName || mp.characterName,
    mp.characterBio =  req.body.characterBio || mp.characterBio,
    mp.characterPhotoUrl = req.body.characterPhotoUrl || mp.characterPhotoUrl,
    mp.invention = req.body.invention || mp.invention,
    mp.editedDate = Date.now();

    mp.save(function(err, result) {
      if(err) {
        res.status(500).send("Error saving post: " + err);
      } else {
        res.json(result);
        console.log(result);
        // res.status(200).send("Post edited successfully");
      }
    });
  }).delete(function(req, res) {
    res.locals.mypost.remove(function(err) {
      if(err) {
        res.status(500).send("Error removing post: " + err);
      } else {
        res.sendStatus(204);
      }
    });
  });

module.exports = router;
