/** Express */
const express = require('express')
const app = express()
/** Cors */
const cors = require('cors')
/** Body parser */
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false 
    })
)

/** Configuration - Lib dependencies */
let _conf = require('./lib/conf')

/** Static page */
app.use(express.static('./public/'))


/** ROUTERS */
const userRouter = require('./router/users')
app.use('/users', userRouter)


app.listen( _conf.app.port, () => console.log(`App is running at port ${_conf.app.port}`) )