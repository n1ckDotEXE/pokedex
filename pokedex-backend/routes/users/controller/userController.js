const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../Model/User");
const mongoDBErrorHelper = require("../../lib/mongoDBErrorHelper");

module.exports = {
	// Signup
	signUp: async (req, res) => {
		try {
			// Uses Bcrypt to generate salt with 10 rounds
			let salted = await bcrypt.genSalt(10);
			// Hashes user's supplied password
			let hashedPassword = await bcrypt.hash(req.body.password, salted);

			// Creates a new user
			let createdUser = new User({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				password: hashedPassword,
			});

			// Inserts new user into MongoDB
			let savedUser = await createdUser.save();

			res.json({
				data: savedUser,
			});
		} catch (e) {
			res.status(500).json(mongoDBErrorHelper(e));
		}
	},
	// Login
	login: async (req, res) => {
		try {
			// Searches MongoDB for a user with matching email
			let foundUser = await User.findOne({ email: req.body.email });

			// Throws an error message if email of user is not found
			if (!foundUser) {
				throw {
					message: "Email is not registered, please go sign up!",
				};
			}

			// If a matching email is found in MongoDB, compares supplied password with hashed password
			let comparedPassword = await bcrypt.compare(
				req.body.password,
				foundUser.password
			);

			// If password doesn't match, throws error to check password
			// If password matches, creates a JWT token with an expiration of 1 Day
			if (!comparedPassword) {
				throw { message: "Check your email and password!" };
			} else {
				let jwtToken = jwt.sign(
					{
						email: foundUser.email,
					},
					process.env.JWT_SECRET,
					{ expiresIn: "1d" }
				);

				res.json({
					jwtToken: jwtToken,
				});
			}
		} catch (e) {
			res.status(500).json(mongoDBErrorHelper(e));
		}
	},
	// Update user's password
	updateUserPassword: async (req, res) => {
		try {
			// Searches MongoDB for a user with matching email
			let foundUser = await User.findOne({ email: req.body.email });

			// Throws an error message if email of user is not found
			if (!foundUser) {
				throw { message: "User not found!!!!" };
			}

			// Confirms if user's password is valid
			let comparedPassword = await bcrypt.compare(
				req.body.oldPassword,
				foundUser.password
			);

			// If password is invalid, throws error to try again
			if (!comparedPassword) {
				throw { message: "Cannot update your password, check again" };
			}

			// Uses Bcrypt to generate salt with 10 rounds
			let salted = await bcrypt.genSalt(10);
			// Hashes user's new supplied password
			let hashedNewPassword = await bcrypt.hash(
				req.body.newPassword,
				salted
			);

			// Updates user in MongoDB with new email, hashed password
			await User.findOneAndUpdate(
				{ email: req.body.email },
				{ password: hashedNewPassword },
				{ new: true }
			);

			res.json({
				message: "success",
				payload: true,
			});
		} catch (e) {
			res.status(500).json(mongoDBErrorHelper(e));
		}
	},
};
