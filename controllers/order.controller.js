/**
 * This file comprises all details related to orders
 */

 const Product = require('../models/product.model');
 const Address = require('../models/address.model');
 const Order = require('../models/order.model');
 const User = require('../models/user.model');
 
 const createOrder = async (req, res) => {
     try{
     
         /**
          * 1. Read the order details from request 
          */
         let productId = req.body.productId;
         let addressId  = req.body.addressId;
         let quantity = req.body.quantity;
         let userId = req._id;
 
         /**
          * 2. check if the product corresponding to given id exists or not
          */
         const productObj = await Product.findOne({'_id':productId});
         if(!productObj){
             res.status(404).send({
                 message : 'No Product found for ID - '+productId
             })
         }
 
         /**
          * Check if product is out of stock
          */
         if(productObj.availableItems < 1){
             return res.status(200).send({
                 message : "Product with Id - " + productId+' is currently out of stock!'
             })
         }
 
         if( productObj.availableItems >= quantity){
             productObj.availableItems = productObj.availableItems - quantity;
         }

         //save changes to Product
         const updatedProduct = await productObj.save();
 
         /**
          *  3. Check if address corresponding to addressId exists or not
          * here addressId is the _id associated with each document
          */
         const addressObj = await Address.findById(addressId);
         if(!addressObj){
             res.status(404).send({
                 message : 'No Address found for ID - '+addressId
             })
         }
 
         const userObj = await User.findById(userId);
         /**
          * 4. saving the order
          */
         const orderObj = {
             amount : quantity,
             productId : productId,
             addressId : addressId,
             userId : userId
         }
 
         const orderPlaced = await Order.create(orderObj);
 
         /**
          * 5. Prepare the post response
          */
         const postResponse = {
             id : orderPlaced.id
         };
         postResponse.user = userObj
         postResponse.product = updatedProduct;
         postResponse.shippingAddress = addressObj;
         postResponse.amount = orderPlaced.amount,
         postResponse.orderDate = orderPlaced.orderDate;
 
         return res.status(200).send(postResponse);
 
     }catch(err){
         console.log(err.message)
         return res.status(500). send({
             message : "Internal Server error while making order"
         })
     }
 }
 
 module.exports = {
     createOrder : createOrder
 }