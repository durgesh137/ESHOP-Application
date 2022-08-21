/**
 * This file comprises details related to user authentication and authorization
 * => signup
 * => signin
*/
const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config');
/**
 * This function signs up user and stores in users collection 
 */
 exports.signup = async(req, res) => {
    /**
     * Handling the user signup process here
    */
    try{
        /**
         * 1. Read the request body and create JS object to be inserted in DB
        */
        const userObj = {
            firstName : req.body.firstName,
            lastName :req.body.lastName,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password , 8),
            contactNumber : req.body.contactNumber,
            name : req.body.name,
            role : req.body.role
        }
        
        /**
         * 3. save the user in database
         */
        const savedUser = await User.create(userObj);

        if(!savedUser){
            return res.status(500).send({
                message : 'Try any other email, this email is already registered!'
            })        
        }
        /**
         * 4. Return success once user successfully stored
         */
        //First prepare the postResponse 
        const postResponse = {
            _id : savedUser._id,
            firstName : savedUser.firstName,
            lastName : savedUser.lastName,
            email : savedUser.email
        }
        res.status(200).send(postResponse)
        
    }catch(err){
        /**
         * 4 return error response, if user could not saved
        */
       console.log('Error while registering user ', err.message);
        return res.status(500).send({
            message : 'Internal server error while saving user!'
        })
    }
}

/**
 * This function logs in the user, after verification, and returns access token on success as response headers
 */

 exports.signin = async (req, res) => {
    try{

        /**
         * Read the userId and password from the request
         */
        const userEmailFromReq = req.body.email ;
        const password = req.body.password ;

        /**
         * Finding the user having the corresponding emailId
         */
        const userSaved =  await User.findOne({email : userEmailFromReq});

        if(!userSaved){
            return res.status(401).send({
            message : "This email has not been registered!"
            })
        }

        /**
         * Comapring the password
         * Encrypted password is there in db... done using bcrypt
         */
        const isValidPassword  = bcrypt.compareSync(password, userSaved.password);

        if(!isValidPassword){
            return res.status(401).send({
            message : "Invalid Credentials!"
            })
        }


        /**
         * We need to generate the access token ( JWT based )
         */
        const token = jwt.sign({
        id : userSaved._id
        },authConfig.SECRET_KEY,{
        expiresIn : 600
        })

        /**
        *  set access token as x-auth-token in response headers
        */
        res.header('x-auth-token', token)  

        /**
        * Send the response back
        */

        res.status(200).send({
            email : userSaved.email,
            name : userSaved.name,
            isAuthenticated : true
        });

    }catch(err){
        console.log("Error while login ", err.message);
        res.status(500).send({
        message : "Internal server error while user signin process"
        })
    }

}