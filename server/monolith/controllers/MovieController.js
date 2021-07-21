const Movie = require ('../models/Movie')

class MovieController {
    static findAll(req, res) {
        Movie.findAll()
        .then(movies => {
            res.status(200).json(movies)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    }

    static findOne(req, res) {
        let id = req.params.id
        Movie.findOne(id)
        .then(movies => {
            if (movies.length > 0) {
                res.status(200).json(movies[0])
            } else {
                res.status(404).json({error: 'movie not found'})
            }
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    }

    static addMovie(req, res) {
        let newMovie = req.body
        if (!newMovie.title) {
            res.status(400).json({error: 'Please fill in movie title'})            
        } else {
            Movie.addMovie(newMovie)
            .then(() => {
                res.status(201).json(newMovie)
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
        }
    }

    static delete(req, res) {
        let id = req.params.id
        let movie;
        Movie.findOne(id)
        .then((data) => {
            if (data.length > 0) {
                movie = {...data[0]}
                return Movie.delete(id)
                .then(() => {
                    res.status(200).json(`Successfully deleted movie '${movie.title}'`)
                })
                .catch(err => {
                    res.status(500).json({error: err})
                })
            } else {
                res.status(404).json({error: 'movie not found'})
            }
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    }

    static edit(req, res) {
        let id = req.params.id
        let editedData = req.body
        if (!editedData.title) {
            res.status(400).json({error: 'Please fill in movie title'})            
        } else {
            Movie.findOne(id)
            .then((data) => {
                if (data.length > 0) {
                    return Movie.edit(id, editedData)
                    .then(() => {
                        editedData._id = id
                        res.status(200).json(editedData)
                    })
                    .catch(err => {
                        res.status(500).json({error: err})
                    })
                } else {
                    res.status(404).json({error: 'movie not found'})
                }
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
        }
    }
}

module.exports = MovieController