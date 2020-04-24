const jwt = require('jsonwebtoken');

module.exports = {
    jwtSecret: process.env.JWT_SECRET || 'this is a secret',

    generateToken(user) {
        const payload = {
            subject: user.id,
            username: user.username
        }
        const options = {
            expiresIn: '1d'
        }
        return jwt.sign(payload, this.jwtSecret, options)
    }
}