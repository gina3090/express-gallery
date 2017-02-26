const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();

const CONFIG = require('./config/config.json');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const logout = require('express-passport-logout');

const db = require('./models');
const Users = db.Users;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const user = require('./routes/user');
const gallery = require('./routes/gallery');

const hbs = handlebars.create({
  extname: '.hbs',
  defaultLayout: 'app'
});

app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.use(cookieParser());

app.use(session({
  store: new RedisStore(),
  secret: CONFIG.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    Users.findOne({
      where: {
        username: username
      }
    })
    .then((user) => {
      if(user === null) {
        return done(null, false, {message: 'Incorrect username'});
      } else {
        bcrypt.compare(password, user.password).then(res => {
          if(res) {
            return done(null, user);
          } else {
            return done(null, false, {message: 'Incorrect password'});
          }
        });
      }
    }).catch(err => {
      console.log('error: ', err);
    });
  }
));

passport.serializeUser(function(user, done) {
  return done(null, user);
});

passport.deserializeUser(function(user, done) {
  return done(null, user);
});

app.use('/login', user);
app.use('/gallery', gallery);

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('partials/login');
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/gallery',
  failureRedirect: '/login'
}));
 
app.get('/logout', logout());

module.exports = app;