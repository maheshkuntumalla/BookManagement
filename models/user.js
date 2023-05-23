const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    title : {
        type : String,
        enum : ['Mr', 'Mrs', 'Miss', 'Mast'],
        required : 'Title is required'
    },
    name : {
        type : String,
        required : 'First name is required',
        trim : true
    },
    phone : {
        type : Number,
        required : 'Phone Number is required',
        unique : true,
        trim : true,
        validate : function(phone){
            return /^\d{10}$/.test(phone)
        }, message : 'Please fill a valid phone number', isAsync : true
    },
    email : {
        type : String,
        trim : true,
        unique : true,
        lowercase : true,
        required : 'Email Id is required',
        validate : {
            validator : function(email){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message : 'Please fill a valid email address', isAsync : true
        }

    },
    password : {
        type : String,
        trim : true,
        unique : true,
        required : 'Password is required',
        validate : {
            validator : function(password){
                return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)
            }, message : 'Please fill a valid password (minimum eight characters, at least one uppercase letter, one lowercase letter and one number)', isAsync : true
        }
    },
    address : {
        street: {type:String, trim:true },
        city: {type:String, trim:true },
        pincode: {type:String, trim:true },
        country: {type:String, trim:true}
    }
}, {timestamps : true})

module.exports = mongoose.model('User', userSchema, 'Users')