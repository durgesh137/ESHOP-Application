/**
 * This file will work as middleware to check details of the user
 * -> email validation
 * -> contactNumber validation
 */

const defaults = require('../utils/default.values');

/**
 * 1. This function validates details of the user
 */
const checkSignupDetails = (req, res, next) => {
 
    /**
     * check values supplied for firstName, lastName, and name
     */
    if(!req.body.firstName){
        req.body.firstName = defaults.EMPTY_STRING
    }

    if(!req.body.lastName){
        req.body.lastName = defaults.EMPTY_STRING
    }

    if(!req.body.name){
        if(req.body.firstName && req.body.lastName){
            req.body.name = req.body.firstName + ' ' + req.body.lastName
        }
    }

    /**
     * if user role supplied, then it is admin otherwise user
     */
    if(req.body.role){
        req.body.role = defaults.ADMIN_ROLE
    }else{
        req.body.role = defaults.USER_ROLE
    }
    /**
     * Validating contact number
     */
    if(req.body.contactNumber){
        if(!(/^[1-9][0-9]{9}$/).test(req.body.contactNumber)){
            return res.status(400).send({
                message : 'Invalid contact number!'
            });
        }
    }else{
        req.body.contactNumber = defaults.CONTACT_NUMBER;
    }

    /**
     * validating email id
    */
    if(req.body.email){
        if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).test(req.body.email)){
            return res.status(400).send({
                message : 'Invalid email-id format!'
            })
        }
    }else{
        return res.status(400).send({
            message : 'email-id not given!'
        })
    }

    /**
     * check password field
     */
    if(!req.body.password){
        return res.status(400).send({
            message : 'password not given!'
        })
    }

    next()
}

/**
 * 2. This function validates details of the user
 */
 const checkSigninDetails = (req, res, next) => {

    if(!req.body.email){
        return res.status(400).send({
            message : 'email-id not given!'
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message : 'password not given!'
        })
    }

    /**
     * validating email id
    */
     if(!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).test(req.body.email)){
        return res.status(400).send({
            message : 'Invalid email-id format!'
        })
    }
    
    next()

}

module.exports = {
    checkSignupDetails : checkSignupDetails,
    checkSigninDetails : checkSigninDetails
}