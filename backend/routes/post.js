const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const userModel = mongoose.model('user')
const jobModel = mongoose.model('jobmodel')
const recruiterModel = mongoose.model('recruiter')

const userReqLogin = require('../middlewares/userReqLogin')
const recruiterReqLogin = require('../middlewares/recruiterReqLogin')

// Get all Jobs
router.get('/showjobs', (req, res) => {
    jobModel.find().populate("postedBy", "_id name company").then((allJobs) => {
        res.json({ allJobs })
    }).catch((error) => {
        console.log(error)
    })
})

// Post a job
router.put('/recruiter/createJob', recruiterReqLogin, (req, res) => {
    const { jobRole, jobDescription } = req.body

    console.log('test')

    const job = new jobModel({
        jobRole, jobDescription, postedBy: req.recruiter._id
    })

    job.save().then((_) => {
        // res.json({ _ })
        // console.log(_)
        recruiterModel.findOneAndUpdate({ _id: req.recruiter._id }, {
            $push: { jobsPosted: { jobData: _._id } }
        }).exec((error, result) => {
            // console.log(result)
            if (error)
                return res.status(422).json({
                    error: error
                })

            res.status(200).json(result)
        })
    }).catch((error) => {
        res.status(422).json({
            error: error
        })
    })
})

// Apply for a Job
router.put('/user/apply', userReqLogin, (req, res) => {
    const { jobId } = req.body

    userModel.findOneAndUpdate({ _id: req.user._id }, {
        $addToSet: { appliedTo: jobId }
    }, {
        new: true
    }).exec((error, result) => {
        if (error)
            return res.status(422).json({
                error: error
            })

        jobModel.findOneAndUpdate({ _id: jobId }, {
            $addToSet: { appliedList: req.user._id }
        }, {
            new: true
        }).exec((error, result) => {

            if (error)
                return res.status(422).json({
                    error: error
                })

            res.status(200).json(result)
        })
    })
})

module.exports = router