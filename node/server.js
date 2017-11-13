const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { mongoose } = require('./db/mongoose');
const { User } = require('./db/models/user');
const { Product } = require('./db/models/product');



// const passport = require('passport');
// const Strategy = require('passport-http').BasicStrategy;

// passport.use(new Strategy(
//   function(username, password, next) {
//     db.users.findByUsername(username, function(err, user) {
//       if (err) { return next(err); }
//       if (!user) { return next(null, false); }
//       if (user.password != password) { return next(null, false); }
//       return next(null, user);
//     });
//   }
// ));

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Main entrypoint (never used)');
});

app.get('/user/', (req, res) => {
  res.send('User API');
});

app.post('/user/', (req, res) => {
  let body = _.pick(req.body, ['username', 'password']);

  let user = new User(body);

  user.save().then(() => {
    res.send(user);
  });
});

app.get('/api/', (req, res) => {
  res.send('Content API');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
})
