/**
 * This file comprises details of the Product schema
 * Fields are:
 * -> for productId, _id will be used,
 * -> availableItems, category, cratedAt, description, imageUrl, manufacturer, name, price, updatedAt
 * -> required fileds are name, category, price, manufacturer, availableItems, iamgeUrl
 */
 const mongoose = require('mongoose');
 const productSchema = new mongoose.Schema({ 

   name : {
      type : String,
      required : true
   },

   category : {
      type : String,
      required : true,
      default : ''
  },

   price : {
      type : Number,
      required : true,
      default : 0.0
   },

   description : {
      type : String,
      default : ""
   },

   manufacturer : {
      type : String,
      required : true,
      default : null
   },

   availableItems : {
         type : Number,
         required : true,
         default : 0
   },
     
   imageUrl : {
        type : String,
        required : true,
        default : 'image url'
   },

   createdAt : {
      type : Date,
      default : () =>{
          return Date.now();
      },
      immutable : true
   },

   updatedAt : {
      type : Date,
      default : () =>{
         return Date.now();
      }
   }

 })
 
 module.exports = mongoose.model('Product', productSchema);