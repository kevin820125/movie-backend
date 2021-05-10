"use strict";


const express = require("express");
const cors = require("cors");
const { NotFoundError } = require("./expressError");
const usersRoutes = require("./routes/users");
const authRoutes = require('./routes/auth')
const {authenticateJWT} = require('./middleware/auth')
const watchListRoutes = require('./routes/watchList')
const morgan = require("morgan");
const app = express();
const moviesRoutes = require('./routes/movies')

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT)


app.use('/movie' , moviesRoutes)
app.use('/user' , usersRoutes)
app.use('/auth' , authRoutes)
app.use('/watchlist' , watchListRoutes )

app.use(function(req, res,next){
    return next(new NotFoundError());
})

app.use(function(err, req , res , next){
    const status = err.status || 500;
    const message = err.message;
    return res.status(status).json({
        error : {message , status},
    });
});



module.exports = app;