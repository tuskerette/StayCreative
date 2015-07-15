var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();

// Routes for auth for Angularjs
var isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()){
    return next();
  } else {
    res.status(401);
    res.end();
  }
};

router.route('/register')
  .post(function(req, res, next) {
    Account.register(new Account({username: req.body.username, email: req.body.email}), req.body.password, function(err, account) {
      if(err) {
        return res.json({account: account});
      }
      req.login(account, function(err) {
        if(err) {
          console.log("error in establishing the session")
        }
        res.json(account);
      });
    })
  })

router.route('/login')
  .get(function(req, res, next){
    res.json(req.user);
  })
  .post(passport.authenticate('local'), function(req, res) {
    res.json(req.user)
    console.log("req.user is " + req.user);
});

router.all('/logout', function(req, res, next) {
  req.logout();
  res.json({user: "user, you logged out successfully"});
});

router.get('/user', isAuthenticated, function(req, res) {
    res.send(req.user);
  });

module.exports = router;
