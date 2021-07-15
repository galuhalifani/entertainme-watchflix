const { MongoClient } = require("mongodb");

const url = 'mongodb://localhost:27017'

async function connect() {
    const client = new MongoClient(url)

    // Database Name
    const dbName = 'entertainmedb'

    await client.connect()

    const db = client.db(dbName)
    const movieCollection = db.collection('movies')
    const tvCollection = db.collection('tv_series')

    return db
}

modeul.exports = {
    connect
}