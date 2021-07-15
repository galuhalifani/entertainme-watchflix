const { MongoClient } = require("mongodb");

const url = 'mongodb://localhost:27017'

let database = null

async function connect() {
    const client = new MongoClient(url)

    // Database Name
    const dbName = 'entertainmedb'

    await client.connect()

    const db = client.db(dbName)

    database = db

    return db
}

function getDatabase() {
    return database
}

module.exports = {
    connect,
    getDatabase
}