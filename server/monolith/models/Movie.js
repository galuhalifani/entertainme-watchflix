const { getDatabase } = require ('../config/mongodb')
const { ObjectId } = require ('mongodb')

class Movie {
    static findAll() {
        const movieCollection = getDatabase().collection('movies')
        return movieCollection.find().toArray()
    }

    static findOne(id) {
        const movieCollection = getDatabase().collection('movies')
        return movieCollection.find({_id: ObjectId(id)}).toArray()
    }

    static addMovie(movie) {
        const movieCollection = getDatabase().collection('movies')
        return movieCollection.insertOne(movie)
    }

    static delete(id) {
        const movieCollection = getDatabase().collection('movies')
        return movieCollection.deleteOne({_id: ObjectId(id)})
    }

    static edit(id, data) {
        const movieCollection = getDatabase().collection('movies')
        return movieCollection.updateOne(
            {_id: ObjectId(id)},
            {$set: data}
        )
    }
}

module.exports = Movie