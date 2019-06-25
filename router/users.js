/** Express */
const express = require('express')
let userRoute = express.Router()

/**
 * Lib dependency
 */
const _helper = require('./../lib/helper')
const _tokenService = require('./../lib/tokenService')
/**
 * Register Mongoose model
 */
let userModel = require('./../models/User')

/**
 * Register Route
 * Method: POST
 */
userRoute.post('/register', (req, res)=>{
    let formData = req.body
    let today = new Date()
    let userData    = {
        first_name  :   typeof(formData.first_name) !== 'undefined' &&
                        formData.first_name.length > 0
                        ? formData.first_name : '',
                        
        last_name   :   typeof(formData.last_name) !== 'undefined' &&
                        formData.last_name.length > 0
                        ? formData.last_name : '',

        email    :   typeof(formData.email) !== "undefined" &&
                        formData.email.length > 0
                        ? formData.email : false,

        password    : typeof(formData.password) !== "undefined" &&
                    formData.password.length > 0
                    ? formData.password : false,
        created_at  : today
    }
    
    // Check if email and password (required fields) are supplied
    if( userData.email && userData.password ){

        // Look up if customer exist
        userModel.findOne( { 'email': userData.email})
                 .then( user => {
                     if(!user){
                        userData.password = _helper.hash(userData.password)
                        userModel.create(userData)
                            .then(user => {
                                res.json({ error: false, data: `User ${userData.email} registered!` })
                            })
                            .catch( err => {
                                res.send({ error: true, data: `Error: ${err}` })
                            })
                     }else{
                         res.json({error: true, data: `User already exists`})
                     }
                 })

    }else{
        res.send( {
            error: true,
            data: 'Missing required fields'
        })
    }

})

/**
 * Login Route
 * Method: POST
 */
userRoute.post('/login', (req, res) =>{
    let email   =   typeof(req.body.email) !== 'undefined'
                    && req.body.email.length > 0
                    ? req.body.email : false

    let password   =   typeof(req.body.password) !== 'undefined'
                    && req.body.password.length > 0
                    ? req.body.password : false

    if( email && password ){
        
        userModel.findOne({
            email: email
        })
        .then( user => {
            if(user){

                // Compare the password
                if( _helper.hash(password) == user.password){
                    const responseData = {
                        _id : user._id,
                        first_name : user.first_name,
                        last_name : user.last_name,
                        email : user.email
                    }
                    // Generate token
                    let token = _tokenService.sign(responseData)
                    res.send( {error:false, data: token} )
                }else{
                    res.send( {error: true, data: 'User does not exists'} )
                }

            }else{
                res.json({
                    error: true,
                    data: 'User does not exists'
                })
            }
        })
        .catch(err => res.send({ error: true, data: err }) )


    }else{
        res.json({
            error: true,
            data: 'User does not exists'
        })
    }
})

/**
 * Profile Route
 */
userRoute.get('/profile', (req, res)=>{
    let headerToken = typeof( req.headers.authorization ) !== 'undefined'
                        && req.headers.authorization.length > 0
                        ? req.headers.authorization : false
    if( headerToken ) {
        let profileInfo = _tokenService.verify(headerToken)
        res.json( {error: false, data: profileInfo} )
    }else{
        res.json( {error: true, data: 'Token is required!'} )
    }
})


module.exports = userRoute