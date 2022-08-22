/**
 * This file comprises comprises schema details of Address model
 * => Fields are:
 * city, landmark, name, contactNumber, state, zipCode, userId
 * -> _id for address documents will be used to uniquely identify address
 * -> 
 */
 const mongoose = require('mongoose');
 const addressSchema = new mongoose.Schema({
    name : {
        type : String,
        default : '',
        required : true
    },

    city : {
         type : String,
         required : true
     },
     
    landmark : {
         type : String,
         required : true,
         default : ""
     },
     
    contactNumber : {
         type : Number,
         required : true
    },
     
    state : {
         type: String,
         required : true
    },
     
    street : {
         type : String,
         required : true,
    },
 
    zipCode : {
         type : Number,
         required : true
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
    },

     //refering to User schema
     userId : {
      type : [mongoose.SchemaTypes.ObjectId],
      ref : "User"  
     }

 })
 
 module.exports = mongoose.model('Address', addressSchema);