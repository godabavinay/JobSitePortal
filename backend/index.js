const express = require('express')
const db = require('./config/db')
const path = require('path')

const app = express()

const PORT = process.env.PORT || 5000

// Middleware to convert incoming req to JSON object
app.use(express.json())

app.use(require('./routes/auth'))
app.use(require('./routes/post'))

if (true || process.env.NODE_ENV === "production") {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')))
}

app.listen(PORT, () => {
    console.log(`Listening on Port number ${PORT}`)
})