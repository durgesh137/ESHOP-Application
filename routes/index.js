/**
 * This file comprises details of all the routes and exported methods from related controllers
 */

const userValidator = require('../middlewares/user.validator');
const addressValidator = require('../middlewares/address.validator');
const productController = require('../controllers/product.controller');
const authController = require('../controllers/auth.controller');
const addressController = require('../controllers/address.controller');

const authJwt = require('../middlewares/auth.jwt');
const productValidator = require('../middlewares/product.validator');
const authAdmin = require('../middlewares/auth.admin')

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

    /**
     * Product Controller route
     * 4. search product "/products" + GET
     * Any authentication not required
     */
     app.get('/Eshop/api/v1/products', productController.searchProduct);    

    /**
     * Product Controller route
     * 5. Get Product Categories - '/products/categories'
    */
     app.get('/Eshop/api/v1/products/categories',productController.productCategories)

     /**
     * Product Controller route
     * 6. Get Product by Product Id - '/products/{id}' + GET
     */
    app.get('/Eshop/api/v1/products/:productId', productController.getProductById);

    /**
     * 7. Save Products - '/products' + POST
    */
     app.post('/Eshop/api/v1/products',[authJwt.verifyToken, authAdmin.isAdmin, productValidator.validateAddProduct], productController.addProduct)     

     /**
     * 8. Update Product Details - '/products/{id}'  + PUT
     */
    app.put('/Eshop/api/v1/products/:productId',[authJwt.verifyToken, authAdmin.isAdmin], productController.updateProductById);

    /**
     * 9. Delete Product - '/products/{id}' + DELETE
    */
    app.delete('/Eshop/api/v1/products/:productId', [authJwt.verifyToken, authAdmin.isAdmin],productController.deleteProductById);

}