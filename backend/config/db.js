const mongoose = require('mongoose')
const { MONGO_URI } = require('../config/keys')

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Connected to DB')
})

mongoose.connection.on('error', () => {
    console.log('Connection failed to DB')
})

require('../models/userModel')
require('../models/jobModel')
require('../models/recruiterModel')