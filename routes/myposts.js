var express = require('express');
var router = express.Router();
var MyPosts = require('../models/myposts');
var Account = require('../models/account');

var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
    res.status(401);
    res.end();
  }
};

// GET request to show all the posts
router.get('/myposts', function(req, res) {
  if(req.user){
    Account.findById(req.user._id, function(err, user) {
      if(err) {
        console.log("error getting the user");
      } else {
        console.log("we found the user " + user);
        MyPosts.find({
          _id: {$in: user.userPosts}
        }, function(err, posts) {
          if(err) {
            console.error(err);
          } else {
            res.json(posts);
          }
        })
      };
    })
  } else {
    res.json({error: "you must be authenticated to see the posts"})
  }
});

// POST request to add a new post to the db.
router.post('/add', isAuthenticated, function(req, res) {
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
        Account.findByIdAndUpdate(req.user._id, { $push: {userPosts: mypost._id} }, function(err, user) {
          if(err) {
            console.log("error");
          } else {
            console.log("saved post id to user array userPosts");
          }
        })
        res.json(mypost);
      }
    });
});


// Routes for post by :id
router.route('/:mypost_id', isAuthenticated)
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
