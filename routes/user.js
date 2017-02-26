const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.Users;

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/new', (req, res) => {
  res.render('partials/new-user');
});

router.post('/new', (req, res) => {
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      Users.create({
        username: req.body.username,
        password: hash
      })
      .then(_ => {
        res.redirect('/login');
      });
    });
  });
});

module.exports = router;