var passport = require('passport');
var Account = require('../models/account');
var express = require('express');
var router = express.Router();

// router.route('/register')
//   .get(function(req, res, next) {
//     res.render('register', {});
//   })
//   .post(function(req, res, next) {
//     Account.register(new Account({username: req.body.username, email: req.body.email}), req.body.password, function(err, account) {
//       if(err) {
//         return res.render('register', {account: account});
//       }

//       req.login(account, function(err) {
//         res.redirect('/');
//       });
//     })
//   })

//   router.route('/login')
//   .get(function(req, res, next){
//     res.render('login', {user: req.user});
//   })
//   .post(passport.authenticate('local'), function(req, res) {
//   res.redirect('/');
// });

// router.all('/logout', function(req, res, next) {
//   req.logout();
//   res.redirect('/');
// });

// Routes for auth for Angularjs
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
    res.json({user: req.user});
  })
  .post(passport.authenticate('local'), function(req, res) {
    res.json({user: req.user})
    console.log("req.user is " + req.user);
});

router.all('/logout', function(req, res, next) {
  req.logout();
  // console.log("successfully logged out");
  res.json({user: "user, you logged out successfully"});
});

module.exports = router;
