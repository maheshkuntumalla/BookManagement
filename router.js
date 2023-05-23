const express = require('express')
const router = express.Router()


const user = require('./controllers/user')
router.use('/user', user)

const book = require('./controllers/book')
router.use('/book', book)

const review = require('./controllers/review')
router.use('/review', review)


module.exports = router