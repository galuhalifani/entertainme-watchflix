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
            console.log(response.ops)
            res.json({message: `success adding ${newSeries.title}!`, series: series.ops})
        })
        .catch(err => {
            console.log(err)
        })
    }

    
    static delete(req, res) {
        let id = req.params.id
        Series.delete(id)
        .then((data) => {
            res.json({message: `success deleting series with ID ${id}!`, data: data})
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
            res.json({message: `success editing ${editedData.title}!`, response: response})
        })
        .catch(err => {
            console.log(err)
        })
    }
}

module.exports = SeriesController