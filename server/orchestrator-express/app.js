const express = require('express')
const axios = require('axios')
const app = express()
const port = 4000
const MovieController = require('./controllers/MovieController')
const SeriesController = require('./controllers/SeriesController')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('Welcome to EntertainMe!')
})

// MOVIES
app.get('/movies', MovieController.findAllMovies)
app.post('/movies', MovieController.addMovies)
app.delete('/movies/:id', MovieController.deleteMovie)
app.put('/movies/:id', MovieController.editMovie)

// SERIES
app.get('/tvseries', SeriesController.findAllTvSeries)
app.post('/tvseries', SeriesController.addSeries)
app.delete('/tvseries/:id', SeriesController.deleteSeries)
app.put('/tvseries/:id', SeriesController.editSeries)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})