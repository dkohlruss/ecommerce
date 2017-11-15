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

app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

app.get('/', (req, res) => {
	res.status(200).send('Main entrypoint (never used)');
});

// USER PATHS FOR LOGIN/REGISTRATION

app.get('/user/', (req, res) => {
	res.send('User API');
});

app.get('/user/:id', (req, res) => {
	let user = req.params.id;
	res.send(`Placeholder get path for ${user}; unlikely to be used`);
});

app.post('/user/login/', (req, res) => {
	// Placeholder for login
	let body = _.pick(req.body, ['email', 'password']);

	res.send(body);
});

app.post('/user/register/', (req, res) => {
	let body = _.pick(req.body, ['username', 'password']);

	let user = new User(body);

	user
		.save()
		.then(() => {
			res.send(user);
		})
		.catch(err => {
			if (err.name === 'ValidationError') {
				res.status(409).send();
			}

			res.status(400).send();
		});
});

// PATHS FOR QUERYING DB FROM END-USER (FOR BROWSING)
// AND ADMINS (ADDING/MODIFYING PRODUCTS)

app.get('/api/', (req, res) => {
	// Picks off items (grouped by name), and the price, for listing on mosaic
	Product.aggregate([
		{
			$group: {
				_id: '$name',
				price: { $first: '$price' },
				category: { $first: '$category' }
			}
		}
	]).then(result => {
		res.send(result);
	});
});

app.get('/api/product/:name', (req, res) => {
	// Picks off all info from specific item
	let params = { name: req.params.name };

	console.log(params);

	Product.aggregate([
		{
			$match: params
		}
	]).then(result => {
		console.log(result);
		res.send(result);
	});

	// Product.find(params)
	// 	.then(products => {
	// 		if (products.length === 0) {
	// 			res.status(404).send();
	// 		} else {
	// 			res.send(products);
	// 		}
	// 	})
	// 	.catch(err => {
	// 		res.status(400).send();
	// 	});
});

app.post('/api/new', (req, res) => {
	// Adds a new item with parameters from form
	// Should require user auth and admin status (TODO)
	let body = _.pick(req.body, [
		'name',
		'designer',
		'category',
		'price',
		'description',
		'size',
		'color',
		'stock'
	]);

	let product = new Product(body);
	product
		.save()
		.then(() => {
			res.send(product);
		})
		.catch(err => {
			res.status(400).send();
		});
});

app.listen(3001, () => {
	console.log('Server started on port 3001');
});

// Exporting app for testing purposes
module.exports = {
	app
};
