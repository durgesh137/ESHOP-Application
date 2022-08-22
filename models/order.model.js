/**
 * This file comprises schema details for Order
 * -> fields are amount, addressId, userId, productId, orderDate and _id as well
 */

/**
 * This model will comprise details of the Order
 */
 const mongoose = require('mongoose');
 const orderSchema = new mongoose.Schema({ 

     amount : {
         type : Number,
         required : true
     },

     //referring to address schema
     addressId : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Address" ,
        required : true 
     },

     //referring to Product schema
    productId : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Product" ,
        required : true 
     },

     //referring to User schema
     userId : {
      type : [mongoose.SchemaTypes.ObjectId],
      ref : "User",
      required : true  
     },

     orderDate : {
        type : Date,
        default : () =>{
            return Date.now();
        }        
     }
 })
 
 module.exports = mongoose.model('Order', orderSchema);