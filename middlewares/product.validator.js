/**
 * This file validates the requests related to products, works as middleware
 */
const defaults = require('../utils/default.values')

/**
 * this function validates the product add process
 */

const validateAddProduct = (req, res, next) => {
    /**
     * validating all product fields
     */

    if(req.body.name === undefined){
        req.body.name = defaults.PRODUCT_NAME
    }

    if(req.body.availableItems === undefined){
        return res.status(400).send({
            message : "Product available quantity is not mentioned!"
        })
    }else{
        if(req.body.availableItems < 0){
            return res.status(400).send({
                message : "Product available quantity can't be negative!"
            })  
        }
    }

    if(req.body.price){
        if(req.body.price < 0){
            return res.status(400).send({
                message : "Product price can't be negative"
            })
        }
    }else{
        return res.status(400).send({
            message : "Product price is not mentioned"
        })
    }

    if(req.body.category === undefined){
        req.body.category = defaults.PRODUCT_CATEGORY
    }

    if(req.body.description === undefined){
        req.body.description = defaults.PRODUCT_DESCRIPTION
    }

    if(req.body.imageUrl === undefined){
        req.body.imageUrl = defaults.PRODUCT_IMAGE_URL
    }

    if(req.body.manufacturer === undefined){
        req.body.manufacturer = ''
    }
    next();
}


module.exports = {
    validateAddProduct : validateAddProduct
}