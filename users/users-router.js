const express = require('express');
const router = express.Router();
const Users = require('./users-model');

router.get('/', (req, res) => {
    Users.get()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ message: 'Could not get users' })
        })
})

module.exports = router;