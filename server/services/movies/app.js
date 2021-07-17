const { connect } = require ('./config/mongodb.js')
const express = require('express')
const app = express()
const port = 4001
const MovieController = require ('./controllers/MovieController')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// MOVIES
app.get('/movies', MovieController.findAll)
app.get('/movies/:id', MovieController.findOne)
app.post('/movies', MovieController.addMovie)
app.delete('/movies/:id', MovieController.delete)
app.put('/movies/:id', MovieController.edit)

connect()
.then(async (db) => {
    console.log('Connected successfully to server')

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})