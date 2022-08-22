/**
 * This file checks whether the request is made by an admin or not
 * => is it valid admin
 */
const User = require('../models/user.model');

/**
 * validate Admin user
 */
 const isAdmin = async (req, res, next) => {
    const userObj = await User.findOne({_id : req._id});
 
    if(!(userObj.role === 'ADMIN')){//fed after validating token
        return res.status(401).send('You are not authorised to access this endpoint!')
    }

    next()
}

module.exports = {
    isAdmin : isAdmin
}