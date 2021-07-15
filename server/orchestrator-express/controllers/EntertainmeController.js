const axios = require('axios')

let movieUrl = 'http://localhost:4001/movies'
let seriesUrl = 'http://localhost:4002/tvseries' 

class Controller {
    static getAll(req, res) {
        let movies;
        let series;

        axios({
            url: `${movieUrl}`,
            method: 'get'
        })
        .then(({data}) => {
            movies = data
            return axios({
                url: `${seriesUrl}`,
                method: 'get'
            })
        })
        .then(({data}) => {
            series = data
            res.status(200).json({movies: movies, tvSeries: series})
        })
        .catch(err => {
            console.log(err)       
        })
    }
}

module.exports = Controller