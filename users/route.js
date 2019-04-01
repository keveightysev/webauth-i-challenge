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

module.exports = router;
