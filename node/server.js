const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');
const _ = require('lodash');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { mongoose } = require('./db/mongoose');
const { User } = require('./db/models/user');
const { Product } = require('./db/models/product');
const { makeCart } = require('./helpers');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ secret: 'secretphrase' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// PASSPORT STRATEGY & INIT
passport.serializeUser(function(user, done) {
	done(null, { username: user.username, level: user.level });
});

passport.deserializeUser(function(user, done) {
	done(null, user);
});

passport.use(
	new LocalStrategy(function(username, password, done) {
		User.findByCreds(username, password)
			.then(user => {
				console.log('success case', user);
				done(null, user);
			})
			.catch(err => {
				console.log(('error case', err));
				done(err, false);
			});
	})
);

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

app.get('/user/cart', (req, res) => {
	if (req.isAuthenticated()) {
		let params = {
			username: req.user.username
		};

		User.findOne(params)
			.then(result => {
				let cart = makeCart(result);
				console.log(cart);
				res.send(cart);
			})
			.catch(err => {
				res.status(400).send();
			});
	} else {
		// Send cart information from session data
		res.send(req.session.cart);
	}
});

app.post('/user/cart', (req, res) => {
	if (req.isAuthenticated()) {
		let product = _.pick(req.body.product, ['name', 'price', 'size']);

		User.findOneAndUpdate(
			{ username: req.user.username },
			{
				$push: {
					cart: product
				}
			},
			{
				new: true
			}
		).then(result => {
			let cart = makeCart(result);
			res.send(cart);
		});
	} else {
		// Store cart information in sesison data.
		req.session.cart
			? req.session.cart.push(product)
			: (req.sesison.cart = [product]);
	}
});

app.post('/user/login/', passport.authenticate('local'), (req, res) => {
	if (req.user) {
		res.send(req.session.passport.user);
	}
});

app.post('/user/logout', function(req, res) {
	req.logout();
	res.send('Logged out');
});

app.post('/user/register/', (req, res) => {
	let body = _.pick(req.body, ['username', 'password']);
	body.cart = [];
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

	Product.aggregate([
		{
			$match: params
		}
	]).then(result => {
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
