const { restart } = require('nodemon');
const request = require('request-promise');
require("dotenv").config()
const {Key_API} = process.env


const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


const getWatchlist = async(req, res) => {

  const client = new MongoClient(MONGO_URI, options);

  try {
      await client.connect();
      const db = client.db("movies");
      console.log("connected!");

      let result = await db.collection("watchlist").find().toArray()
      
      client.close();
      console.log("disconnected!");
      return res.status(201).json({ status: 201, data: result });

  } catch (err) {
      console.log(err.stack)
      client.close();
      console.log("disconnected!");
      return res.status(500).json({ status: 500, message:[] });
  }

};

const addMovie = async(req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {

      await client.connect();
      const db = client.db("movies");
      console.log("connected!");

      const movie = req.body;
      console.log(movie)
      await db.collection("watchlist").insertOne(movie)

      return res.status(200).json({ status: 200, message: "Added successfully"});
  } catch {
      return res.status(400).json({ status: 400, message: "Invalid data!" });
  }
};

const updateMovie = async(req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {

      await client.connect();
      const db = client.db("movies");
      console.log("connected!");

      const updatedMovie = req.body;
      console.log(updatedMovie)

      const res = await db.collection("watchlist").findOneAndReplace({ _id: updatedMovie._id }, updatedMovie, {returnNewDocument:true})
      console.log(res)
      return res.status(200).json({ status: 200, message: "updated successfully" });
  } catch {
      return res.status(400).json({ status: 400, message: "not found! 😱" });
  }
};

const deleteMovie = async(req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
      await client.connect();
      const db = client.db("movies");
      console.log("connected!");

      const id = req.params.id;

      await db.collection("watchlist").findOneAndDelete({ id: id })

      return res.status(200).json({ status: 200, message: "deleted successfully"});
  } catch {
      return res.status(400).json({ status: 400, message: "not found! 😱" });
  }
};



const getAllMovies = async(req, res) => {
 try {
    const response = await request (`https://imdb-api.com/en/API/Top250Movies/${Key_API}`, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    res.status(200).send(response)
  } catch (error) {
   res.status(400).json({status: 400, message: error })
  }
}

const getMoviesBySearch = async(req, res) => {
  try {
      const response = await request(`https://imdb-api.com/en/API/Search/${Key_API}/${req.params.query}`, {
        headers: {
          "Content-Type": "application/json"
        },
      });

      res.status(200).send(response)
    } catch (error) {
      res.status(400).json({status: 400, message: error })
    }
}

const getMovieById = async(req, res) => {
  try {
    const response = await request(`https://imdb-api.com/en/API/Title/${Key_API}/${req.params.id}`, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    res.status(200).send(response)
  } catch (error) {
    res.status(400).json({status: 400, message: error })
  }
}

const getActorById = async(req, res) => {
  try {
    const response = await request(`https://imdb-api.com/en/API/Name/${Key_API}/${req.params.id}`, {
      headers: {
        "Content-Type": "application/json"
      },
    });
    res.status(200).send(response)
  } catch (error) {
    res.status(400).json({status: 400, message: error })
  }
}




module.exports = {
  getAllMovies,
  getMoviesBySearch,
  getMovieById,
  getWatchlist,
  addMovie,
  deleteMovie,
  updateMovie,
  getActorById
}