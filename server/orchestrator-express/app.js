const express = require('express')
const axios = require('axios')
const app = express()
const port = 4000
const router = require('./routes/index.js')
const MovieController = require('./controllers/MovieController')
const SeriesController = require('./controllers/SeriesController')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('Welcome to EntertainMe')
})

app.use('/entertainme', router)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = app