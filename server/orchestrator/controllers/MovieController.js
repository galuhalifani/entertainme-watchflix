const axios = require('axios')
const { ApolloError, UserInputError } = require('apollo-server');
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
                    throw new ApolloError(`Failed fetching movie`, '500', err);      
                })
            }
        })
        .catch(err => {
            throw new ApolloError(`Cache connection error`, '500', err);   
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
                    // console.log(data)
                    return data
                })
                .catch(err => {
                    throw new ApolloError(`Failed fetching movie`, '500', err);
                })
            }
        })
        .catch(err => {
            throw new ApolloError(`Cache connection error`, '500', err);
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
            return data
        })
        .catch(err => {
            if (err.response.data.error == 'Please fill in movie title') {
                throw new UserInputError('Please fill in movie title', {status: '400'})
            } else if (err.response.data.error) {
                throw new ApolloError(`${err.response.data.error}`, '404', err)  
            } else {
                throw new ApolloError('Failed Adding Movie', '500', err)
            }  
        })
    }

    static deleteMovie(movieId) {
        let id = movieId
        return axios({
            url: `${baseUrl}/${id}`,
            method: 'delete'
        })    
        .then(({data}) => {
            redis.del("movies")
            redis.del(`movies-${id}`)
            return data
        })
        .catch(err => {
            if (err.response.data.error == 'movie not found') {
                throw new ApolloError('Movie Not Found', '404')  
            } else if (err.response.data.error) {
                throw new ApolloError(`${err.response.data.error}`, '404', err)  
            } else if (err.isAxiosError == true) {
                throw new ApolloError('Connection Error / Unknown Path', '500', err)  
            } else {
                throw new ApolloError('Error Deleting Movie', '500', err)  
            }
        })
    }

    static editMovie(editedMovie, movieId) {
        let id = movieId
        let updated = editedMovie
        // console.log('UPDATED', updated)
        return axios({
            url: `${baseUrl}/${id}`,
            method: 'put',
            data: updated
        })
        .then(({data}) => {
            redis.del("movies")
            redis.del(`movies-${id}`)
            return data
        })
        .catch((err) => {
            if (err.response.data.error == 'movie not found') {
                throw new ApolloError('Movie Not Found', '404')  
            } else if (err.response.data.error == 'Please fill in movie title') {
                throw new UserInputError('Please fill in movie title', {status: '400'})  
            } else if (err.response.data.error) {
                throw new ApolloError(`${err.response.data.error}`, '404', err)  
            } else if (err.isAxiosError == true) {
                throw new ApolloError('Connection Error / Unknown Path', '500', err)  
            } else {
                throw new ApolloError('Error Editing Movie', '500', err)  
            }
        })
    }
}

module.exports = MovieController