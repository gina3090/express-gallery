const express = require('express');
const router = express.Router();
const db = require('../models');
const Gallery = db.Gallery;

router.get('/new', (req, res) => {
  res.render('partials/new-gallery');
});

router.get('/:id', (req, res) => {
  Gallery.findById(req.params.id)
    .then((gallery) => {
      res.render('partials/gallery', {gallery: gallery});
    })
    .catch(err => console.error(err));
});

router.get('/:id/edit', (req, res) => {
  Gallery.findById(req.params.id)
    .then((gallery) => {
      res.render('partials/edit-gallery', {gallery: gallery});
    })
    .catch(err => console.error(err));
});

router.get('/:id/delete', (req, res) => {
  Gallery.findById(req.params.id)
    .then((gallery) => {
      res.redirect('/gallery');
    })
    .catch(err => console.error(err));
});

router.get('/', (req, res) => {
  Gallery.findAll()
    .then((gallery) => {
      res.render('partials/gallery', {galleries: gallery});
    })
    .catch(err => console.error(err));
});

router.post('/new', (req, res) => {
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

router.get('/:id/edit', (req, res) => {
  Gallery.findById(req.params.id)
  .then((gallery) => {
    res.render('partials/edit-gallery', {gallery: gallery});
  })
  .catch(err => console.error(err));
});

router.put('/:id/edit', (req, res) => {
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

router.delete('/:id/delete', (req, res) => {
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