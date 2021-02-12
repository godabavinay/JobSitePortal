const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config/keys')
const mongoose = require('mongoose')

module.exports = (req, res, next) => {
    const { auth } = req.headers
    
    if (!auth) {
        return res.status(401).json({
            error: 'authentication failed'
        })
    }

    const token = auth.replace('user', '')

    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
        if (error)
            return res.status(401).json({ error })

        const { _id } = payload
        const userModel = mongoose.model('user')

        userModel.findById(_id).then((userData) => {
            req.user = userData
            next()
        }).catch((error) => res.status(422).json({ error }))
    })
}