const Movie = require ('../models/Movie')

class MovieController {
    static findAll(req, res) {
        Movie.findAll()
        .then(movies => {
            res.json(movies)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static addMovie(req, res) {
        let newMovie = req.body
        Movie.addMovie(newMovie)
        .then((movie) => {
            res.json({message: `success adding ${newMovie.title}!`, movie: movie})
        })
        .catch(err => {
            console.log(err)
        })
    }

    static delete(req, res) {
        let id = req.params.id
        Movie.delete(id)
        .then((response) => {
            res.json({message: `success deleting movie with ID ${id}!`, response: response})
        })
        .catch(err => {
            console.log(err)
        })
    }

    static edit(req, res) {
        let id = req.params.id
        let editedData = req.body
        Movie.edit(id, editedData)
        .then((response) => {
            res.json({message: `success editing ${editedData.title}!`, response: response})
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = MovieController