const mongoose = require('mongoose')

const jobModelSchema = new mongoose.Schema({
    jobRole: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'recruiter'
    },
})

mongoose.model('jobmodel', jobModelSchema)