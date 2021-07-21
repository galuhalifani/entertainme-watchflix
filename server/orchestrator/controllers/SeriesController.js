const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis({
    host: 'redis-10199.c82.us-east-1-2.ec2.cloud.redislabs.com',
    port: 10199,
    password: 'Njfl3TKiWk0uYkEKSnsOtftMFpe3ltYm'
});
const { ApolloError, UserInputError } = require('apollo-server');

// let baseUrl = 'http://44.192.96.163:4002/tvSeries'
let baseUrl = 'http://localhost:4002/tvSeries'

class SeriesController {
    static findAllTvSeries() {
        return redis.get("series")
        .then(series => {
            if (series) {
                // console.log('PAKE REDIS')
                return JSON.parse(series)
            } else {
                // console.log('GA PAKE REDIS')
                return axios({
                    url: `${baseUrl}`,
                    method: 'get'
                })
                .then(({data}) => {
                    redis.set("series", JSON.stringify(data))
                    return data
                })
                .catch(err => {
                    throw new ApolloError(`Failed fetching series`, '500', err);   
                })
            }
        })
        .catch(err => {
            throw new ApolloError(`Cache connection error`, '500', err);   
        })
    }

    static findOneSeries(id) {
        return redis.get(`series-${id}`)
        .then(serie => {
            if (serie) {
                // console.log('PAKE REDIS')
                return JSON.parse(serie)
            } else {
                // console.log('GA PAKE REDIS')
                return axios({
                    url: `${baseUrl}/${id}`,
                    method: 'get'
                })
                .then(({data}) => {
                    redis.set(`series-${id}`, JSON.stringify(data))
                    // console.log(data)
                    return data
                })
                .catch(err => {
                    throw new ApolloError(`Failed fetching series`, '500', err);   
                })
            }
        })
        .catch(err => {
            throw new ApolloError(`Cache connection error`, '500', err);
        })
    }

    static addSeries(newSeries) {
        let series = newSeries
        return axios({
            url: `${baseUrl}`,
            method: 'post',
            data: series
        })
        .then(({data}) => {
            redis.del("series")
            return data
        })
        .catch(err => {
            if (err.response.data.error == 'Please fill in series title') {
                throw new UserInputError('Please fill in series title', {status: '400'})
            } else if (err.response.data.error) {
                throw new ApolloError(`${err.response.data.error}`, '404', err)  
            } else {
                throw new ApolloError('Failed Adding Series', '500', err)
            }   
        })
    }

    static deleteSeries(seriesId) {
        let id = seriesId
        let deletedSeries;
        return SeriesController.findOneSeries(id)
        .then((data) => {
            if (data) {
                deletedSeries = data
                return axios({
                    url: `${baseUrl}/${id}`,
                    method: 'delete'
                })
            }
        })
        .then(({data}) => {
            redis.del("series")
            redis.del(`series-${id}`)
            return data
        })
        .catch(err => {
            if (err.response.data.error == 'series not found') {
                throw new ApolloError('Series Not Found', '404')  
            } else if (err.response.data.error) {
                throw new ApolloError(`${err.response.data.error}`, '404', err)  
            } else if (err.isAxiosError == true) {
                throw new ApolloError('Connection Error / Unknown Path', '500', err)  
            } else {
                throw new ApolloError('Error Deleting Series', '500', err)  
            }        
        })
    }

    static editSeries(editedSeries, seriesId) {
        let id = seriesId
        let updated = editedSeries
        return axios({
            url: `${baseUrl}/${id}`,
            method: 'put',
            data: updated
        })
        .then(({data}) => {
            redis.del("series")
            redis.del(`series-${id}`)
            return data
        })
        .catch(err => {
            if (err.response.data.error == 'series not found') {
                throw new ApolloError('Series Not Found', '404')  
            } else if (err.response.data.error == 'Please fill in series title') {
                throw new UserInputError('Please fill in series title', {status: '400'})  
            } else if (err.response.data.error) {
                throw new ApolloError(`${err.response.data.error}`, '404', err)  
            } else if (err.isAxiosError == true) {
                throw new ApolloError('Connection Error / Unknown Path', '500', err)  
            } else {
                throw new ApolloError('Error Editing Series', '500', err)  
            }     
        })
    }
}

module.exports = SeriesController