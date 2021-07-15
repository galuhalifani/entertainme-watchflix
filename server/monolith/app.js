const { connect } = require ('./config/mongodb.js')

connect()
.then(db => {
    console.log('Connected successfully to server', db)
})