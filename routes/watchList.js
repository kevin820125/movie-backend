const express = require('express');
const router =express.Router();
const key = require('../secretKey')
const axios = require('axios');
const WatchList = require('../models/watchList')


    router.get('/:username', async function(req, res){
        let r = await WatchList.get(req.params.username)
        return res.json(r)
    })


    router.post('/:username/:movieId' , async function (req ,res , next){
        try{
            let r = await WatchList.save(req.params.username , req.params.movieId)
            return res.json(r)
        }catch(e){
            return next(e)
        }
    })

    router.post('/delete/:username/:movieId' , async function(req ,res,next){
        try{
            let r = await WatchList.delete(req.params.username , req.params.movieId)
            return res.json(r)
        }catch(e){
            return next(e)
        }
    })

module.exports = router;