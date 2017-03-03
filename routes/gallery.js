const express = require('express');
const router = express.Router();
const db = require('../models');
const Galleries = db.Galleries;

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    console.log('Access granted');
    next();
  } else {
    console.log('Access denied');
    res.redirect('/login');
  }
}

router.use(function (req, res, next) {
  if(req.method !== 'GET') {
    isAuthenticated(req, res, next);
  } else {
    next();    
  }
});

router.get('/new', (req, res) => {
  res.render('partials/new-gallery');
});

router.get('/:id', (req, res) => {
  Galleries.findById(req.params.id)
    .then((gallery) => {
      res.render('partials/gallery', {gallery: gallery});
    })
    .catch(err => console.error(err));
});

router.get('/:id/edit', (req, res) => {
  Galleries.findById(req.params.id)
    .then((gallery) => {
      res.render('partials/edit-gallery', {gallery: gallery});
    })
    .catch(err => console.error(err));
});

router.get('/', (req, res) => {
  Galleries.findAll()
    .then((gallery) => {
      res.render('partials/gallery', {galleries: gallery});
    })
    .catch(err => console.error(err));
});

router.post('/new', (req, res) => {
  Galleries.create({
    link: req.body.link,
    author: req.body.author,
    description: req.body.description
  })
    .then((gallery) => {
      res.redirect('/gallery');
  })
    .catch(err => console.error(err));
});

router.get('/:id/edit', (req, res) => {
  Galleries.findById(req.params.id)
  .then((gallery) => {
    res.render('partials/edit-gallery', {gallery: gallery});
  })
  .catch(err => console.error(err));
});

router.put('/:id/edit', (req, res) => {
  Galleries.update({
    link: req.body.link,
    author: req.body.author,
    description: req.body.description
  }, {
    where: {
      id: req.params.id
    }
  })
  .then((gallery) => {
    res.redirect(`/gallery/${req.params.id}`);
  })
  .catch(err => console.error(err));
});

router.delete('/:id', (req, res) => {
  Galleries.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((gallery) => {
    res.redirect('/gallery');
  })
  .catch(err => console.error(err));
});

module.exports = router;