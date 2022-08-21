/**
 * This file comprises details of all the routes and exported methods from related controllers
 */

const userValidator = require('../middlewares/user.validator');
const authController = require('../controllers/auth.controller');

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



}