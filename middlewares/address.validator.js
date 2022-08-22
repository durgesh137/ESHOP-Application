/**
 * This file validates the details of the address
 */
const defaults = require('../utils/default.values');

const checkAddressDetails = (req, res, next) => {
    /**
     * validating the zip code
     */
    if(req.body.zipCode){
        if(!(/^[1-9][0-9]{5}$/).test(req.body.zipCode)){
        return res.status(400).send('Invalid zip code!');
        
        }   
    }else{
        return res.status(400).send({
            message : 'Address Zip Code not given!'
        })
    }

    /**
     * validating address name field
     */
    if(!req.body.name){
        return res.status(400).send({
            message : 'Address name is not given!'
        })
    }

    /**
     * validating contact number
     */
    if(req.body.contactNumber){
        if(!(/^[1-9][0-9]{9}$/).test(req.body.contactNumber)){
            return res.status(400).send('Invalid contact number!');
        }
    }else{
        req.body.contactNumber = defaults.CONTACT_NUMBER
    }

    /**
     * validating city field
     */
    if(!req.body.city){
        return res.status(400).send({
            message : 'Address city is not mentioned!'
        })
    }
    /**
     * validating landmark field
     */
    if(!req.body.landmark){
        req.body.landmark = defaults.LANDMARK;
    }

    /**
     * validating state field
     */
    if(!req.body.state){
        return res.status(400).send({
            message : 'Address state is not mentioned'
        })
    }

    /**
     * validating street field
    */
     if(!req.body.street){
        return res.status(400).send({
            message : 'Address street is not mentioned'
        })
    }

    next();
}


module.exports = {
    checkAddressDetails : checkAddressDetails
}