const express = require('express');

const Users = require('./model.js');
const restricted = require('../auth/restricted.js');

const router = express.Router();

router.get('/', restricted, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error retrieving the users' });
  }
});

module.exports = router;
