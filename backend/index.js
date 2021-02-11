const express = require('express')
const db = require('./config/db')

const app = express()

const PORT = process.env.PORT || 5000

// Middleware to convert incoming req to JSON object
app.use(express.json())

app.use(require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`Listening on Port number ${PORT}`)
})