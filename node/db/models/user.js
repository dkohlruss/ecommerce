const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		minlength: 1,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minlength: 6
	},
	level: {
		type: Number,
		required: false,
		default: 0
	},
	cart: {
		type: Array,
		required: false,
		minlength: 0,
		trim: true,
		default: []
	}
	// ,
	// tokens: [{
	//   access: {
	//     type: String,
	//     required: true
	//   },
	//   token: {
	//     type: String,
	//     required: true
	//   }
	// }]
});

// Instance methods (small u user)
UserSchema.methods.generateAuthToken = function() {
	let user = this;

	let access = 'auth';
	let token = jwt
		.sign(
			{
				_id: user._id.toHexString(),
				access
			},
			'secretval'
		)
		.toString();

	user.tokens.push({ access, token });

	return user.save().then(() => {
		return token;
	});
};

// Returns only properties given (to avoid including password, token, and other sensitive info)
UserSchema.methods.toJSON = function() {
	let user = this;
	let userObject = user.toObject();

	return _.pick(userObject, ['_id', 'username', 'level']);
};

UserSchema.methods.removeToken = function(token) {
	let user = this;

	return user.update({
		$pull: {
			tokens: {
				token: token
			}
		}
	});
};

// Model Methods on big U User
UserSchema.statics.findByToken = function(token) {
	let User = this;
	var decoded;

	try {
		decoded = jwt.verify(token, 'secretval');
	} catch (e) {
		return Promise.reject();
	}

	return User.findOne({
		_id: decoded._id,
		'tokens.token': token,
		'tokens.access': 'auth'
	});
};

UserSchema.statics.findByCreds = function(username, password) {
	let User = this;

	// Find user first...
	return User.findOne({
		username: username
	}).then(user => {
		if (!user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					console.log('success in User');
					resolve(user);
				} else {
					reject();
				}
			});
		});
	});
};

UserSchema.pre('save', function(next) {
	// next needs to be provided as called
	let user = this;

	if (user.isModified('password')) {
		// if the password is modified
		// gen salt and hash user.password
		// then call next
		let password = user.password;
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = { User };
