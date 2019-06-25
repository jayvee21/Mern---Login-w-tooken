const mongoose  = require('mongoose')
let _config     = require('./conf')

// Connecting to database
mongoose.connect( _config.mongoDB.url, {useNewUrlParser: true} )
module.exports = mongoose