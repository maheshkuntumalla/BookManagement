const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:{
        type : String,
        required : "title is required",
        trim : true,
        unique : true
    },
    excerpt:{
        type : String,
        required : true,
        trim : true
    },
    userId:{
        required : 'User is required to create book',
        reqs : 'User',
        type : mongoose.Types.ObjectId
    },
    ISBN:{
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    category:{
        type : String,
        required : 'Book category is required',
        trim : true
    },
    subcategory:{
        type : String,
        required : true,
        trim : true
    },
    reviews:{
        type : Number,
        default : 0 
    },
    deletedAt:{
        type : Date,
        default : null
    },
    isDeleted:{
        type : Boolean,
        default : false
    },
    releasedAt:{
        type : Date,
        default : null
    }
},{ timestamps : true})


module.exports = mongoose.model('Book', bookSchema);