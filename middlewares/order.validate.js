/**
 * This file checks the details of order, acting as middleware
 */

/**
 * This function checks order details prior to order
 */
const checkOrderDetails = (req, res, next) => {
    if(!req.body.productId){
        return res.status().send({
            message : 'Product Id is not given!'
        })
    }

    if(!req.body.addressId){
        return res.status().send({
            message : 'Address Id is not given!'
        })
    }

    if(!req.body.quantity){
        return res.status().send({
            message : 'Order quantity is not given!'
        })
    }else{
        if(req.body.quantity <= 0){
            return res.status().send({
                message : "Order quantity can't negative or zero!"
            })  
        }
    }

    next();
}

module.exports = {
    checkOrderDetails : checkOrderDetails
}