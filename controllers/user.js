const express = require('express')
const router = express.Router()
const utilities = require('./utillities')
const userModel = require('../models/user')
const jwt = require('jsonwebtoken')

router.post('/signUp', async (req, res) => {
    try {
        let requestBody = req.body
        if (!utilities.isValidRequestBody) {
            res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide author details' })
            return
        }

        let { title, name, email, phone, password, address } = req.body

        if (!utilities.isValid(title)) {
            res.status(400).send({ status: false, message: 'Title is required' })
            return
        }

        if (!utilities.isValidTitle(title)) {
            res.status(400).send({ status: false, message: `Title should be among Mr, Mrs, Miss and Mast` })
            return
        }

        if (!utilities.isValid(name.trim())) {
            res.status(400).send({ status: false, message: ' name is required' })
            return
        }

        if (!utilities.isValidphone(phone, 'number')) {
            res.status(400).send({ status: false, message: "phone number is required" })
            return
        }

        //mobile number validation
        if (!(/^\d{10}$/.test(phone))) {
            res.status(400).send({ status: false, message: `phone number should be a valid` })
            return
        }

        if (!utilities.isValid(email.trim())) {
            res.status(400).send({ status: false, message: `Email is required` })
            return
        }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()))) {
            res.status(400).send({ status: false, message: `Email should be a valid email address` })
            return
        }

        if (!utilities.isValid(password.trim())) {
            res.status(400).send({ status: false, message: `Password is required` })
            return
        }

        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password.trim()))) {
            res.status(400).send({ status: false, message: `Please fill a valid password (minimum eight characters, at least one uppercase letter, one lowercase letter and one number)` })
            return
        }


        const isEmailAlreadyExist = await userModel.findOne({ email });

        if (isEmailAlreadyExist) {
            res.status(400).send({ status: false, message: `${email} email address is already registered` })
            return
        }

        const isPhoneNumberExist = await userModel.findOne({ phone });

        if (isPhoneNumberExist) {
            res.status(400).send({ status: false, message: `${phone} phone number is already used, try another one` })
            return
        }


        const userData = { title, name, phone, email, password, address }
        const newUser = await userModel.create(userData)
        res.status(201).send({ status: true, message: `user created successfully`, data: newUser });

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
})

router.post('/login', async(req, res, next) =>{
    try{
        const requestBody = req.body;

        if(!utilities.isValidRequestBody(requestBody)) {
            res.status(400).send({status: false, message: 'Invalid request parameters. Please provide login details'})
            return
        }

        // Extract params
        const {email, password} = requestBody;

         // Validation starts
         if(!utilities.isValid(email.trim())) {
            res.status(400).send({status: false, message: `Email is required`})
            return
        }

        if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.trim()))) {
            res.status(400).send({status: false, message: `Email should be a valid email address`})
            return
        }

        if(!utilities.isValid(password.trim())) {
            res.status(400).send({status: false, message: `Password is required`})
            return
        }
        // Validation ends

        const user = await userModel.findOne({email, password})

        if(!user){
            res.status(401).send({status: false, message: `Invalid login credentials`});
            return
        }

        const token = await jwt.sign({userId: user._id}, 'mahesh@cor',{
            expiresIn:"2h"
        })

        res.header('x-api-key', token);
        res.status(200).send({status: true, message: `user login successfull`, data: {token,user}});

    }
    catch(error){
        res.status(500).send({status: false, message: error.message});
    }
})

module.exports = router