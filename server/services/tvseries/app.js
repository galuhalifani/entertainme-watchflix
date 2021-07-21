const { connect } = require ('./config/mongodb.js')
const express = require('express')
const app = express()
const port = process.env.PORT || 4002
const SeriesController = require ('./controllers/SeriesController')
var cors = require('cors')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

// SERIES
app.get('/tvseries', SeriesController.findAll)
app.get('/tvseries/:id', SeriesController.findOne)
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