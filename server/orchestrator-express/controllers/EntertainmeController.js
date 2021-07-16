const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

let movieUrl = 'http://localhost:4001/movies'
let seriesUrl = 'http://localhost:4002/tvseries' 

class Controller {
    static getAll(req, res) {
        let movies;
        let series;
        let redisMovies;
        let redisSeries;

        redis.get("movies")
        .then(cahcedMovies => {
            if (cahcedMovies) {
                // console.log(movies, 'ADA MOVIES NYA')
                redisMovies = cahcedMovies
                return redis.get("series")
            }
        })
        .then(cachedSeries => {
            if (cachedSeries) {
                redisSeries = cachedSeries
            }
            
            if (redisMovies && redisSeries) {
                // console.log('PAKE REDIS DUA DUANYA')
                movies = JSON.parse(redisMovies)
                series = JSON.parse(redisSeries)
                res.status(200).json({movies: movies, tvSeries: series})
            } else if (!redisMovies && redisSeries) {
                // console.log('SERIES REDIS')
                series = JSON.parse(redisSeries)
                axios({
                    url: `${movieUrl}`,
                    method: 'get'
                })
                .then(({data}) => {
                    movies = data
                    redis.set("movies", JSON.stringify(data))
                    res.status(200).json({movies: movies, tvSeries: series})
                })
                .catch(err => {
                    console.log(err)       
                })
            } else if (!redisSeries && redisMovies) {
                // console.log('MOVIES REDIS')
                movies = JSON.parse(redisMovies)
                axios({
                    url: `${seriesUrl}`,
                    method: 'get'
                })
                .then(({data}) => {
                    series = data
                    redis.set("series", JSON.stringify(data))
                    res.status(200).json({movies: movies, tvSeries: series})
                })
                .catch(err => {
                    console.log(err)       
                })
            } else {
                // console.log('ALL FETCH AXIOS')
                axios({
                    url: `${movieUrl}`,
                    method: 'get'
                })
                .then(({data}) => {
                    movies = data
                    redis.set("movies", JSON.stringify(data))
                    return axios({
                        url: `${seriesUrl}`,
                        method: 'get'
                    })
                })
                .then(({data}) => {
                    series = data
                    redis.set("series", JSON.stringify(data))
                    res.status(200).json({movies: movies, tvSeries: series})
                })
                .catch(err => {
                    console.log(err)       
                })            
            }
        })
        .catch(err => {
            console.log(err)
        })            
    }        
}

module.exports = Controller