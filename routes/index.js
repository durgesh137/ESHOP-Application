/**
 * This file comprises details of all the routes and exported methods from related controllers
 */

const userValidator = require('../middlewares/user.validator');
const addressValidator = require('../middlewares/address.validator');
const authController = require('../controllers/auth.controller');
const authJwt = require('../middlewares/auth.jwt');
const addressController = require('../controllers/address.controller');

module.exports = (app) => {
    /**
     * AuthController route
     * 1. signup - "/users" + POST
    */
    app.post('/Eshop/api/v1/users',[userValidator.checkSignupDetails],authController.signup )// save user/admin

    /** 
     * AuthController route
     * 2. login - "/auth" + POST
     */
     app.post('/Eshop/api/v1/auth', [userValidator.checkSigninDetails],authController.signin);

    /**
     * Shipping Address Controller route
     * 3. Add Address - "/addresses" + POST
     */
    app.post('/Eshop/api/v1/addresses',[authJwt.verifyToken, addressValidator.checkAddressDetails] ,addressController.addAddress);



}