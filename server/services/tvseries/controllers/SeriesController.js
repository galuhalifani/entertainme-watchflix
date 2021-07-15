const Series = require ('../models/Series')

class SeriesController {
    static findAll(req, res) {
        Series.findAll()
        .then(series => {
            res.json(series)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static addSeries(req, res) {
        let newSeries = req.body    
        Series.addSeries(newSeries)
        .then((response) => {
            // console.log(response)
            res.json(response)
        })
        .catch(err => {
            console.log(err)
        })
    }

    
    static delete(req, res) {
        let id = req.params.id
        Series.delete(id)
        .then((data) => {
            res.json(data)
        })
        .catch(err => {
            console.log(err)
        })
    }

    static edit(req, res) {
        let id = req.params.id
        let editedData = req.body
        Series.edit(id, editedData)
        .then((response) => {
            res.json(response)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = SeriesController