const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    console.log('Access granted');
    next();
  } else {
    console.log('Access denied');
    res.redirect('/login');
  }
}

router.get('/new', isAuthenticated, (req, res) => {
  res.render('partials/new-gallery');
});

router.get('/:id', isAuthenticated, (req, res) => {
  Gallery.findById(req.params.id)
    .then((gallery) => {
      res.render('partials/gallery', {gallery: gallery});
    })
    .catch(err => console.error(err));
});

router.get('/:id/edit', isAuthenticated, (req, res) => {
  Gallery.findById(req.params.id)
    .then((gallery) => {
      res.render('partials/edit-gallery', {gallery: gallery});
    })
    .catch(err => console.error(err));
});

router.get('/', isAuthenticated, (req, res) => {
  Gallery.findAll()
    .then((gallery) => {
      res.render('partials/gallery', {galleries: gallery});
    })
    .catch(err => console.error(err));
});

router.post('/new', isAuthenticated, (req, res) => {
  Gallery.create({
    link: req.body.link,
    author: req.body.author,
    description: req.body.description
  })
    .then((gallery) => {
      res.redirect('/gallery');
  })
    .catch(err => console.error(err));
});

router.get('/:id/edit', isAuthenticated, (req, res) => {
  Gallery.findById(req.params.id)
  .then((gallery) => {
    res.render('partials/edit-gallery', {gallery: gallery});
  })
  .catch(err => console.error(err));
});

router.put('/:id/edit', isAuthenticated, (req, res) => {
  Gallery.update({
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

router.delete('/:id', isAuthenticated, (req, res) => {
  Gallery.destroy({
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