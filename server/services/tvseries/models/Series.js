const { getDatabase } = require ('../config/mongodb')
const { ObjectId } = require ('mongodb')

class Series {
    static findAll() {
        const seriesCollection = getDatabase().collection('tvSeries')
        return seriesCollection.find().toArray()
    }

    static addSeries(series) {
        const seriesCollection = getDatabase().collection('tvSeries')
        return seriesCollection.insertOne(series)
    }

    static delete(id) {
        const seriesCollection = getDatabase().collection('tvSeries')
        return seriesCollection.deleteOne({_id: ObjectId(id)})
    }

    static edit(id, data) {
        const seriesCollection = getDatabase().collection('tvSeries')
        return seriesCollection.updateOne(
            {_id: ObjectId(id)},
            {$set: data}
        )
    }
}

module.exports = Series