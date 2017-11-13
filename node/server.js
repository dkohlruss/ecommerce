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

// USER PATHS FOR LOGIN/REGISTRATION

app.get('/user/', (req, res) => {
  res.send('User API');
});

app.get('/user/:id', (req, res) => {
  let user = req.params.id;
  res.send(`Placeholder get path for ${user}`);
})

app.post('/user/register/', (req, res) => {
  let body = _.pick(req.body, ['username', 'password']);

  let user = new User(body);

  user.save().then(() => {
    res.send(user);
  });
});

// PATHS FOR QUERYING DB FROM END-USER (FOR BROWSING)
// AND ADMINS (ADDING/MODIFYING PRODUCTS)

app.get('/api/', (req, res) => {
  // Picks off items (grouped by name), and the price, for listing on mosaic
  Product.aggregate([
    { $group: {
                _id: "$name",
                price: { $first: "$price" }
              }
    }
  ]).then((result) => {
    console.log(result);
    res.send(result);
  });
});

app.get('/api/:name', (req, res) => {
  // Picks off all info from specific item
  let name = req.params.name;
  let params = {name};

  Product.find(params).then((products) => {
    res.send(products);
  }).catch((err) => {
    res.send(err);
  });
});

app.post('/api/new', (req, res) => {
  let body = _.pick(req.body, ['name', 'designer', 'category', 'price', 'description', 'size', 'color', 'stock']);

  let product = new Product(body);
  product.save().then(() => {
    res.send(product);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
})
