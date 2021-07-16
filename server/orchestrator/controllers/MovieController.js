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

    static findOneMovie(id) {
        return redis.get(`movies-${id}`)
        .then(movie => {
            if (movie) {
                // console.log('PAKE REDIS')
                return JSON.parse(movie)
            } else {
                // console.log('GA PAKE REDIS')
                return axios({
                    url: `${baseUrl}/${id}`,
                    method: 'get'
                })
                .then(({data}) => {
                    redis.set(`movies-${id}`, JSON.stringify(data))
                    console.log(data)
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

    static addMovies(newMovie) {
        let movie = newMovie
        return axios({
            url: `${baseUrl}`,
            method: 'post',
            data: movie
        })
        .then(({data}) => {
            redis.del("movies")
            let newData = {
                _id: data.insertedId,
                title: movie.title,
                overview: movie.overview,
                poster_path: movie.poster_path,
                popularity: movie.popularity,
                tags: movie.tags
            }
            return newData
        })
        .catch(err => {
            console.log(err)       
            return err
        })
    }

    static deleteMovie(movieId) {
        let id = movieId
        let deletedMovie;
        return MovieController.findOneMovie(id)
        .then((data) => {
            if (data) {
                // console.log(data)
                deletedMovie = data
                return axios({
                    url: `${baseUrl}/${id}`,
                    method: 'delete'
                })    
            }
        })  
        .then(() => {
            redis.del("movies")
            redis.del(`movies-${id}`)
            return deletedMovie
        })
        .catch(err => {
            console.log(err)       
            return err
        })
    }

    static editMovie(editedMovie, movieId) {
        let id = movieId
        let updated = editedMovie
        return axios({
            url: `${baseUrl}/${id}`,
            method: 'put',
            data: updated
        })
        .then(({data}) => {
            redis.del("movies")
            redis.del(`movies-${id}`)
            let edited = {
                _id: id,
                title: updated.title,
                overview: updated.overview,
                poster_path: updated.poster_path,
                popularity: updated.popularity,
                tags: updated.tags
            }
            if (data.acknowledged == true) {
                return edited
            } else {
                return data
            }
        })
        .catch(err => {
            console.log(err)       
        })
    }
}

module.exports = MovieController