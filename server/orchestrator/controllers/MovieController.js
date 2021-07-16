const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

let baseUrl = 'http://localhost:4001/movies'

class MovieController {
    static findAllMovies() {
        return redis.get("movies")
        .then(movies => {
            if (movies) {
                // console.log('PAKE REDIS')
                return JSON.parse(movies)
            } else {
                // console.log('GA PAKE REDIS')
                return axios({
                    url: `${baseUrl}`,
                    method: 'get'
                })
                .then(({data}) => {
                    redis.set("movies", JSON.stringify(data))
                    return data
                })
                .catch(err => {
                    return err   
                })
            }
        })
        .catch(err => {
            return err
        })
    }

    static addMovies() {
        let movie = req.body
        return axios({
            url: `${baseUrl}`,
            method: 'post',
            data: movie
        })
        .then(({data}) => {
            redis.del("movies")
            return {message: `Success adding movie ${movie.title}`, data: data}
        })
        .catch(err => {
            console.log(err)       
        })
    }

    static deleteMovie() {
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
            console.log(err)       
        })
    }

    static editMovie() {
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
            console.log(err)       
        })
    }
}

module.exports = MovieController