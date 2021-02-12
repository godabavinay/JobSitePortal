const mongoose = require('mongoose')

const recruiterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    jobsPosted: [
        {
            jobData: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'jobmodel',
                // default: 'null'
            }
        }
    ]
})

mongoose.model('recruiter', recruiterSchema)