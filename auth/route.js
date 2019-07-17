const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../users/model.js');

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
      req.session.user = user;
      res.status(200).json({ message: `Welcome, ${user.username}!` });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Error signing in' });
  }
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({ message: 'No logging out!' });
      } else {
        res.status(200).json({ message: 'Have a good one, yo,' });
      }
    });
  } else {
    res.status(200).json({ message: 'Have a good one, yo,' });
  }
});

module.exports = router;
