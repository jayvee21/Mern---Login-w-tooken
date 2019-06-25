/** Mongoose instance */
let mongoose = require('./../lib/mongo')

/**
 * Define the schema
 */
let UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now

    }
})

module.exports = mongoose.model('User', UserSchema )