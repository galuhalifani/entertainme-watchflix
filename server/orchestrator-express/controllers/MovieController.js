const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

let baseUrl = 'http://localhost:4001/movies'
class MovieController {
    static findAllMovies(req, res) {
        redis.get("movies")
        .then(movies => {
            if (movies) {
                // console.log('REDIS')
                res.status(200).json(JSON.parse(movies))
            } else {
                // console.log('TIDAK REDIS')
                axios({
                    url: `${baseUrl}`,
                    method: 'get'
                })
                .then(({data}) => {
                    redis.set("movies", JSON.stringify(data))
                    res.status(200).json(data)
                })
                .catch(err => {
                    res.status(500).json({error: err})
                })
            }
        })
    }

    static addMovies(req, res) {
        let movie = req.body
        axios({
            url: `${baseUrl}`,
            method: 'post',
            data: movie
        })
        .then(({data}) => {
            redis.del("movies")
            res.status(201).json({message: `Success adding movie ${movie.title}`, data: data})
        })
        .catch(err => {
            if (err.response.data) {
                res.status(400).json({error: err.response.data})     
            } else {
                res.status(500).json({error: err}) 
            }
        })
    }

    static deleteMovie(req, res) {
        let id = req.params.id
        axios({
            url: `${baseUrl}/${id}`,
            method: 'delete'
        })
        .then(({data}) => {
            redis.del("movies")
            res.status(201).json({message: `Success deleting movie with ID ${id}`, data: data})
        })
        .catch(err => {
            if (err.response.data) {
                res.status(404).json({error: err.response.data})     
            } else {
                res.status(500).json({error: err}) 
            }  
        })
    }

    static editMovie(req, res) {
        let id = req.params.id
        let updated = req.body
        axios({
            url: `${baseUrl}/${id}`,
            method: 'put',
            data: updated
        })
        .then(({data}) => {
            redis.del("movies")
            res.status(201).json({message: `Success updating ${updated.title}`, data: data})
        })
        .catch(err => {
            if (err.response.data.error == 'Please fill in movie title') {
                res.status(400).json({error: err.response.data})     
            } else if (err.response.data) {
                res.status(404).json({error: err.response.data})    
            } else {
                res.status(500).json({error: err}) 
            }  
        })
    }
}

module.exports = MovieController