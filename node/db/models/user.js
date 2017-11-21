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

UserSchema.statics.findByCreds = function(username, password) {
	let User = this;

	return User.findOne({
		username: username
	}).then(user => {
		if (!user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
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
