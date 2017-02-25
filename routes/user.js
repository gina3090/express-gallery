const express = require('express');
const router = express.Router();
const db = require('../models');
const Users = db.Users;

router.get('/new', (req, res) => {
  res.render('partials/new-user');
});

router.post('/new', (req, res) => {
  Users.create({
    username: req.body.username,
    password: req.body.password
  })
    .then((login) => {
      res.redirect('/login');
  })
    .catch(err => console.error(err));
});

module.exports = router;