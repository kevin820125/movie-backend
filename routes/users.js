"use strict";
// routes for users

const {checkUser} = require('../middleware/auth')
const User = require('../models/user')
const WatchList = require('../models/watchList')
const CommentArea = require('../models/commentArea')
const express = require('express');
const router =express.Router();


router.get('/profile/:username' ,checkUser ,async function(req,res,next){
    const user =await User.get(req.params.username)
    if(!user) res.redirect('/movie/popular')
    const watchlist = await WatchList.get(req.params.username)
    const comment = await CommentArea.getUserComment(req.params.username)
    return res.json({ user : user , watchlist : watchlist , comment : comment})
})


router.get('/:username' , checkUser , async function(req ,res , next){
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
      } catch (err) {
        return next(err);
      }
})




module.exports = router;