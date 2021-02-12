const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config/keys')
const mongoose = require('mongoose')

module.exports = (req, res, next) => {
    console.log(req)
    const { auth } = req.headers

    if (!auth) {
        return res.status(401).json({
            error: 'authentication failed'
        })
    }

    const token = auth.replace('recruiter', '')

    jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
        if (error)
            return res.status(401).json({ error })

        const { _id } = payload
        const recruiterModel = mongoose.model('recruiter')

        recruiterModel.findById(_id).then((recruiterData) => {
            req.recruiter = recruiterData
            next()
        }).catch((error) => res.status(422).json({ error }))
    })
}