"use strict";

const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet")

const {getAllMovies, getMoviesBySearch, getMovieById, getWatchlist
,addMovie,deleteMovie, updateMovie,getActorById
} = require("./handlers");

let port = process.env.PORT || 7005
express()


.use(express.json())
.use(helmet())
.use(morgan("tiny"))

// Any requests for static files will go into the public folder
.use(express.static("public"))


//routes
//create an end point 
//Send the request in the backend 

.get("/allMovies", getAllMovies)

.get("/searchMovies/:query", getMoviesBySearch)

.get("/movie/:id", getMovieById)


.get("/watchlist", getWatchlist)

.post("/watchlist", addMovie)

.delete("/watchlist/:id", deleteMovie)

.patch("/watchlist", updateMovie)

.get("/actor/:id", getActorById)

// this is our catch all endpoint.
.get("*", (req, res) => {
    res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
    });
})


// Node spins up our server and sets it to listen on port 8000.
.listen(port, () => console.log(`Listening on port 7005`));