// Lib dependencies
const _conf = require('./conf')
const jwt   =   require('jsonwebtoken')
const fs    =   require('fs')
const path  =   require('path')


// Certificates
const privateKey    =   fs.readFileSync( path.join( __dirname, '/certificates/private.key') , 'utf8' )
const publicKey    =   fs.readFileSync( path.join( __dirname,'./certificates/public.key'), 'utf8' )



module.exports = {

    // Sign new token

    sign: (payload) => {
        let signOptions = {
            issuer: _conf.app.name,
            expiresIn: "30d",
            algorithm: "RS256"
        }

        return jwt.sign(payload, privateKey, signOptions)
    },

    // Verify token
    verify: (token) => {

        let verifyOption = {
            
            issuer: _conf.app.name,
            expiresIn: "30d",
            algorithm: "RS256"
        }

        try {
            return jwt.verify(token, publicKey, verifyOption)
        } catch (error) {
            return error
        }
    },

    // Decode token data
    decode: (token) => {
        return jwt.decode(token, {complete: true})
        // Will return null if token is invalid
    }
}