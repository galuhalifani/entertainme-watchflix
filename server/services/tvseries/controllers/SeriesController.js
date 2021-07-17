const Series = require ('../models/Series')

class SeriesController {
    static findAll(req, res) {
        Series.findAll()
        .then(series => {
            res.status(200).json(series)
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    }

    static findOne(req, res) {
        let id = req.params.id
        Series.findOne(id)
        .then(series => {
            if (series.length > 0) {
                res.status(200).json(series[0])
            } else {
                res.status(404).json({error: 'series not found'})
            }
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    }

    static addSeries(req, res) {
        let newSeries = req.body    
        if (!newSeries.title) {
            res.status(400).json({error: 'Please fill in series title'})
        } else {
            Series.addSeries(newSeries)
            .then(() => {
                res.status(201).json(newSeries)
            })
            .catch(err => {
                res.status(500).json({error: err})
            })    
        }
    }

    static delete(req, res) {
        let id = req.params.id
        let series;
        Series.findOne(id)
        .then((data) => {
            if (data.length > 0) {
                series = {...data[0]}
                return Series.delete(id)
                .then(() => {
                    res.status(200).json(`Successfully deleted series '${series.title}'`)
                })
                .catch(err => {
                    res.status(500).json({error: err})
                })
            } else {
                res.status(404).json({error: 'series not found'})
            }
        })
        .catch(err => {
            res.status(500).json({error: err})
        })
    }

    static edit(req, res) {
        let id = req.params.id
        let editedData = req.body
        if (!editedData.title) {
            res.status(400).json({error: 'Please fill in series title'})            
        } else {
            Series.findOne(id)
            .then((data) => {
                if (data.length > 0) {
                    return Series.edit(id, editedData)
                    .then(() => {
                        editedData._id = id
                        res.status(200).json(editedData)
                    })
                    .catch(err => {
                        res.status(500).json({error: err})
                    })
                } else {
                    res.status(404).json({error: 'series not found'}) 
                }
            })
            .catch(err => {
                res.status(500).json({error: err})
            })
        }
    }
}

module.exports = SeriesController