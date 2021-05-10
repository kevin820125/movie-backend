"use strict";
// routes for users

const jsonschema = require("jsonschema")
const User = require('../models/user')
const {createToken} = require('../helpers/tokens')
const signUpschema = require('../schema/signUp-schema.json')
const loginschema = require('../schema/login-schema.json')
const express = require('express');
const router =express.Router();
const { BadRequestError } = require("../expressError");

router.post('/register' ,async function(req, res,next){
    try{
        const validator =  jsonschema.validate(req.body , signUpschema)
        if(!validator.valid){
            const err = validator.errors.map(e => e.stack)
            throw new BadRequestError(err)
        }
        const newUser = await User.register({...req.body})
        const token = createToken(newUser)
        return res.status(201).json({token})
    }catch(e){
        return next(e)
    }
})

router.post('/login' , async function(req, res , next){
    try{
        const validator = jsonschema.validate(req.body , loginschema)
        if(!validator.valid){
            const err = validator.errors.map(e => e.stack)
            throw new BadRequestError(err)
        }
        const {username , password} = req.body;
        const user = await User.authenticate(username,password)
        let token = createToken(user)
        return res.json({token})
    }catch(e){
        return next(e)
    }
})



module.exports = router;
