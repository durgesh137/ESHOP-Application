/**
 * This file comprises details of address, like saving an address
 */
const Address = require('../models/address.model');
const User = require('../models/user.model');

const addAddress = async (req, res) => {
    try{
        /**
         * 1. read address request and prepare the address object
         */
        const addressObj = {
            name : req.body.name,
            city : req.body.city,
            state : req.body.state,
            street : req.body.street,
            contactNumber : req.body.contactNumber,
            landmark : req.body.landmark,
            zipCode : req.body.zipCode,
            userId : req._id
        }

        /**
         * 2. save the addressObj in address collection
        */
       const savedAddress = await Address.create(addressObj);

       /**
        * 3. prepare the post response
        */
        /**
         * 3.i. userId would be the correct passed after validating the user in another middleware
        */
       const existingUser = await User.findOne({_id : req._id});//userId

       const postResponse = {
            _id : savedAddress._id,
            name : savedAddress.name,
            contactNumber : savedAddress.contactNumber,
            street : savedAddress.street,
            landmark : savedAddress.landmark,
            city : savedAddress.city,
            state : savedAddress.state,
            zipCode : savedAddress.zipCode,
            createdAt : savedAddress.createdAt,
            updatedAt : savedAddress.updatedAt
        }
        /**
         * Embedding user details in post response
         */
        postResponse.user = {
            _id : existingUser._id,
            password  : existingUser.password,
            firstName : existingUser.firstName,
            lastName : existingUser.lastName,
            email : existingUser.email,
            contactNumber : existingUser.contactNumber,
            role : existingUser.role,
            cratedAt : existingUser.createdAt,
            updatedAt : existingUser.updatedAt
        }

        /**
         * return the success response
         */
        return res.status(201).send(postResponse);
    }catch(err){
        console.log(err.message);
        return res.status(500).send({
            message : 'Internal server error while saving  Address'
        });        
    }
    
}

module.exports = {
    addAddress : addAddress
}