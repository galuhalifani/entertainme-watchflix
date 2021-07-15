const express = require('express')
const router = express.Router()
const MovieController = require('../controllers/MovieController')
const SeriesController = require('../controllers/SeriesController')
const Controller = require('../controllers/EntertainmeController')

router.get('/', Controller.getAll)

// MOVIES
router.get('/movies', MovieController.findAllMovies)
router.post('/movies', MovieController.addMovies)
router.delete('/movies/:id', MovieController.deleteMovie)
router.put('/movies/:id', MovieController.editMovie)

// SERIES
router.get('/tvseries', SeriesController.findAllTvSeries)
router.post('/tvseries', SeriesController.addSeries)
router.delete('/tvseries/:id', SeriesController.deleteSeries)
router.put('/tvseries/:id', SeriesController.editSeries)

module.exports = router