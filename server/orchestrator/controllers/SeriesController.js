const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

let baseUrl = 'http://localhost:4002/tvseries'

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
                    return err   
                })
            }
        })
        .catch(err => {
            return err
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
                    return err   
                })
            }
        })
        .catch(err => {
            return err
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
            let newData = {
                _id: data.insertedId,
                title: series.title,
                overview: series.overview,
                poster_path: series.poster_path,
                popularity: series.popularity,
                tags: series.tags
            }
            console.log(data)
            return newData
        })
        .catch(err => {
            console.log(err)       
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
        .then(() => {
            redis.del("series")
            redis.del(`series-${id}`)
            return deletedSeries
        })
        .catch(err => {
            console.log(err)       
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

module.exports = SeriesController