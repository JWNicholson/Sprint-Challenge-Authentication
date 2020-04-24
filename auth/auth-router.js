const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const secrets = require('../config/secrets');

router.post('/register', (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Could not register new user" })
    })

});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.getBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = secrets.generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "Could not login user "})
    })
});

module.exports = router;
