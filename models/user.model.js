/**
 * This file comprise schema details of the user
 * => Fields are:
 *  name, firstName, lastName, email, contactNumber, password, role, createdAt, updatedAt etcetera 
 * => _id will be used to uniquely identify an user
 * => mandatory fields are email, password, contactNumber, and role
*/
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    
    name : {
        type : String,
        default : ''
    },

    firstName : {
        type : String,
        default : ''
    },
    
    lastName : {
        type : String,
        default : ''
    },
    
    email : {
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    },
    
    contactNumber : {
        type: Number,
        required : true
    },
    
    role : {
        type : String,
        required : true,
        default : 'USER',
        enum : ['USER', 'ADMIN']
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

    
})

module.exports = mongoose.model('User', userSchema);