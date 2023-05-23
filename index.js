const express = require('express');
const app = express();

var bodyParser = require('body-parser');

require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/BookManagement")
    .then(() => console.log('mongodb running on 27017'))
    .catch(err => console.log(err))

const main_router = require('./router');
app.use('/api', main_router)

app.listen(process.env.port || 3000, ()=>{
    console.log('Express app running on port ' + (process.env.PORT || 3000))
})
