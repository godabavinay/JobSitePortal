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
    appliedList: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            // default: 'null'
        }
    ]
})

mongoose.model('jobmodel', jobModelSchema)