const { connect } = require ('./config/mongodb.js')
const express = require('express')
const app = express()
const port = 3000
const MovieController = require ('./controllers/MovieController')
const SeriesController = require ('./controllers/SeriesController')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('Welcome to EntertainMe!')
})

// MOVIES
app.get('/movies', MovieController.findAll)
app.post('/movies', MovieController.addMovie)
app.delete('/movies/:id', MovieController.delete)
app.put('/movies/:id', MovieController.edit)

// SERIES
app.get('/tvseries', SeriesController.findAll)
app.post('/tvseries', SeriesController.addSeries)
app.delete('/tvseries/:id', SeriesController.delete)
app.put('/tvseries/:id', SeriesController.edit)

connect()
.then(async (db) => {
    console.log('Connected successfully to server', db)

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})