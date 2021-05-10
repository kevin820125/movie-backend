const express = require('express');
const router =express.Router();
const key = require('../secretKey')
const axios = require('axios');
const CommentArea = require('../models/commentArea')

router.get('/popular' , async function(req,res){
    let r = await axios.get("https://api.themoviedb.org/3/movie/popular",{params : {
        api_key : key
    }});
    let result = r.data.results
    //why without r.data goes wrong?
    res.json(result);
})
router.get('/upcoming' , async function(req,res){
    let r = await axios.get("https://api.themoviedb.org/3/movie/upcoming",{params : {
        api_key : key
    }});
    let result = r.data.results
    res.json(result);
})
router.get('/toprate' , async function(req,res){
    let r = await axios.get("https://api.themoviedb.org/3/movie/top_rated",{params : {
        api_key : key
    }});
    let result = r.data.results
    res.json(result);
})


router.get('/details/:id' , async function(req,res){
    let r = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}`,{params : {
        api_key : key
    }});
    let result = r.data
    res.json(result);
})


router.get('/similar/:id' , async function(req,res){
    let r = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/similar`,{params : {
        api_key : key
    }});
    let result = r.data.results
    res.json(result);
})

router.get('/poster/:id' , async function (req, res){
    let r = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/images`,{params : {
        api_key : key
    }});
    let result = r.data.posters[0]
    res.json(result);
})


router.get('/cast/:id' , async function (req, res){
    let r = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits`,{params : {
        api_key : key
    }});
    let result = r.data.cast
    res.json(result);
})


router.get('/search/:movie' , async function (req, res){
    let r = await axios.get(`https://api.themoviedb.org/3/search/movie/`,{params : {
        api_key : key,
        query : req.params.movie
    }});
    let result = r.data
    res.json(result);
})


router.get('/vedio/:movieId' , async function (req, res){
    let r = await axios.get(`https://api.themoviedb.org/3/movie/${req.params.movieId}/videos`,{params : {
        api_key : key
    }});
    let result = r.data.results[0]
    res.json(result);
})


router.get('/comment/:movieId' , async function (req, res){
    let r = await CommentArea.getMovieComment(req.params.movieId)
    res.json(r)
    })


router.post('/comment/:username/:movieId' , async function(req, res){
        try{
            const{comment} = req.body
            console.log(`this is comment ${comment}`)
            let r = await CommentArea.comment(req.params.username , req.params.movieId , comment)
            return res.json(r)
        }catch(e){
            console.log(e)
        }

})



module.exports = router