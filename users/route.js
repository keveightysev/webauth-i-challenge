const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./model.js');

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const users = await Users.find();
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error retrieving the users' });
	}
});

router.post('/register', async (req, res) => {
	let user = req.body;
	user.password = bcrypt.hashSync(user.password, 8);

	try {
		const newUser = await Users.add(user);
		res.status(201).json(newUser);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error creating the user' });
	}
});

router.post('/login', async (req, res) => {
	let { username, password } = req.body;

	try {
		const user = await Users.findBy({ username });
		if (user && bcrypt.compareSync(password, user.password)) {
			res.status(200).json({ message: `Welcome, ${user.username}!` });
		} else {
			res.status(401).json({ message: 'Invalid credentials' });
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Error signing in' });
	}
});

router.get('/users', restricted, async (req, res) => {
	try {
		const users = await Users.find();
		res.status(200).json(users);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Server error' });
	}
});

async function restricted(req, res, next) {
	const { username, password } = req.headers;
	if (username && password) {
		try {
			const user = await Users.findBy({ username });
			if (user && bcrypt.compareSync(password, user.password)) {
				next();
			} else {
				res.status(401).json({ message: 'Invalid credentials' });
			}
		} catch (err) {
			console.log(err);
			res.status(500).json({ message: 'Server error' });
		}
	} else {
		if (!username) {
			res.status(406).json({ message: 'Please include a username' });
		} else if (!password) {
			res.status(406).json({ message: 'Password field blank' });
		}
	}
}

module.exports = router;
