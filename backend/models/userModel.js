const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    appliedTo: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobmodel',
            // default: 'null'
        }
    ]
})

mongoose.model('user', userSchema)