const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const gallery = require('./routes/gallery');

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(express.static('public'));

app.use('/gallery', gallery);

app.get('/', (req, res) => {
  res.render('index');
});

module.exports = app;