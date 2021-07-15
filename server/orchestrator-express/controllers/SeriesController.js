const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

let baseUrl = 'http://localhost:4002/tvseries'
class SeriesController {
    static findAllTvSeries(req, res) {
        redis.get("series")
        .then(series => {
            if (series) {
                // console.log('REDIS')
                res.status(200).json(JSON.parse(series))
            } else {
                // console.log('TIDAK REDIS')
                axios({
                    url: `${baseUrl}`,
                    method: 'get'
                })
                .then(({data}) => {
                    redis.set("series", JSON.stringify(data))
                    res.status(200).json(data)
                })
                .catch(err => {
                    console.log(err)       
                })                
            }
        })
    }

    static addSeries(req, res) {
        let series = req.body
        axios({
            url: `${baseUrl}`,
            method: 'post',
            data: series
        })
        .then(({data}) => {
            redis.del("series")
            res.status(201).json({message: `Success adding series ${series.title}`, data: data})
        })
        .catch(err => {
            console.log(err)       
        })
    }

    static deleteSeries(req, res) {
        let id = req.params.id
        axios({
            url: `${baseUrl}/${id}`,
            method: 'delete'
        })
        .then(({data}) => {
            redis.del("series")
            res.status(201).json({message: `Success deleting series with ID ${id}`, data: data})
        })
        .catch(err => {
            console.log(err)       
        })
    }

    static editSeries(req, res) {
        let id = req.params.id
        let updated = req.body
        axios({
            url: `${baseUrl}/${id}`,
            method: 'put',
            data: updated
        })
        .then(({data}) => {
            redis.del("series")
            res.status(201).json({message: `Success updating ${updated.title}`, data: data})
        })
        .catch(err => {
            console.log(err)       
        })
    }
}

module.exports = SeriesController