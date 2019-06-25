module.exports = {
    mongoDB: {
        url: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/mern'
    },
    app: {
        name: 'myappname',
        port: process.env.APP_PORT || 5001,
        secret: 'sercretkeyhere'

    }
}