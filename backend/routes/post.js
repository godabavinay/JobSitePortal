const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

const jobModel = mongoose.model('jobmodel')
const recruiterModel = mongoose.model('recruitermodel')

router.get('/', (req, res) => {
    jobModel.find().populate("postedBy", "_id name company").then((allJobs) => {
        res.json({ allJobs })
    }).catch((error) => {
        console.log(error)
    })
})

router.post('/recruiter/createJob', (req, res) => {
    const { jobRole, jobDescription } = req.body

    const job = new jobModel({
        jobRole, jobDescription, postedBy: req.user
    })

    job.save().then((_) => {
        res.json({ _ })
        recruiterModel.findOneAndUpdate(req.user, {
            $push: { jobPosted: {jobData : _._id} }
        }, {
            new: true
        }).exec((error, result) => {
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

module.exports = router