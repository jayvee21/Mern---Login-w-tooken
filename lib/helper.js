/**
 * Primary helper file for some related tasks
 */

let helper = {}

// Lib dependency
let crypto = require('crypto')
let _conf = require('./conf')


/**
 * Hash a string
 */
helper.hash = (str) => {
    const hash = crypto.createHmac('sha256', _conf.app.secret )
                .update(str)
                .digest('hex')
    return hash;
}

module.exports = helper