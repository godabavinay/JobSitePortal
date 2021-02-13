const express = require('express')
const mongoose = require('mongoose')
const userModel = mongoose.model('user')
const recruiterModel = mongoose.model('recruiter')

const jwt = require('jsonwebtoken')
const { JWT_SECRET_KEY } = require('../config/keys')

const router = express.Router()

// User singUp
router.post('/user/signUp', (req, res) => {
    const { name, email, password, contact } = req.body
    // console.log(req.body)

    userModel.findOne({ email }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({
                error: "email already exists"
            })
            // res.send()
        }

        const user = new userModel({
            name, email, password, contact
        })
        user.save().then((msg) => {
            res.status(200).json({
                message: "user created"
            })
        }).catch((error) => {
            res.status(422).json({
                error: "user not created"
            })
        })

    }).catch((error) => {
        res.status(422).json({
            error: error
        })
        // res.send()
    })
})

// Recruiter signUp
router.post('/recruiter/signUp', (req, res) => {
    const { name, email, password, contact, company, designation } = req.body
    // console.log(req.body)

    recruiterModel.findOne({ email }).then((savedRecruiter) => {
        if (savedRecruiter) {
            return res.status(422).json({
                error: "email already exists"
                // savedRecruiter
            })
            // res.send()
        }

        const recruiter = new recruiterModel({
            name, email, password, contact, company, designation
        })

        recruiter.save().then((msg) => {
            res.status(200).json({
                message: "recruiter created"
            })
        }).catch((error) => {
            res.status(422).json({
                error: "recruiter not created"
            })
        })

    }).catch((error) => {
        res.status(422).json({
            error: error
        })
        // res.send()
    })
})

// User singIn
router.post('/user/signIn', (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    userModel.findOne({ email }).then((savedUser) => {
        console.log(savedUser)
        if (!savedUser) {
            return res.status(422).json({
                error: "Invalid email or password"
            })
        }

        if (savedUser.password != password) {
            return res.status(422).json({
                error: "Invalid email or password"
            })
        }
        console.log('test')
        const token = jwt.sign({
            _id: savedUser._id
        }, JWT_SECRET_KEY)

        const { _id, name,
            contact,
            appliedTo } = savedUser

        res.status(200).json({
            message: "user authentication",
            token,
            user: {
                _id,
                name,
                contact,
                appliedTo
            }
        })

    }).catch((error) => {
        // console.log('test failed')
        res.status(422).json({
            error: error
        })
    })
})

// Recruiter signIn
router.post('/recruiter/signIn', (req, res) => {
    const { email, password } = req.body

    recruiterModel.findOne({ email }).then((savedRecruiter) => {
        if (!savedRecruiter) {
            return res.status(422).json({
                error: "Invalid email or password"
            })
        }

        if (savedRecruiter.password != password) {
            return res.status(422).json({
                error: "Invalid email or password"
            })
        }
        const { _id, name,
            contact,
            company,
            designation,
            jobsPosted } = savedRecruiter
            
        const token = jwt.sign({
            _id
        }, JWT_SECRET_KEY)



        res.status(200).json({
            message: "recruiter authentication",
            token,
            recruiter: {
                _id: savedRecruiter._id,
                name,
                contact,
                company,
                designation,
                jobsPosted
            }
        })
    }).catch((error) => {
        res.status(422).json({
            error: error
        })
    })
})

module.exports = router