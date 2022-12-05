import React, { useState, useEffect } from 'react';
import GlobalStyles from "./GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Main from './components/Main';
import Info from './components/Info';
import Watchlist from './components/Watchlist';
import Actor from './components/Actor';
import Loading from './components/Loading';


const App = () => {

  const [movies, setMovies] = useState(null)
  const [watchlist, setWatchlist] = useState(null)
  const [fetched, setFetched] = useState(false)
  const [loading, setLoading] = useState(false)

  const getWatchList = async () => {
      setLoading(true)
      const res = await fetch("/watchlist")
      const result = await res.json()
      setWatchlist(result)
      setLoading(false)
 
  }

  const getMovieBySearch = async(search) => {
    setLoading(true)
    const res = await fetch(`/searchMovies/${search}`)
    const result = await res.json()
    setMovies(result.results)
    setLoading(false)
  }

  const getAllMovies = async () => {

    // let res = await fetchAllMovies() //we have moved the logic to the Backend 
    const res = await fetch("/allMovies") //We are fetching now from this end Point -> Move all the fetches to the backend
    const data = await res.json()
    console.log(data)
    setMovies(data.items)

  }
  useEffect(() => {
    getAllMovies()
  }, []);
  useEffect(() => {
    getWatchList()
  }, [fetched]);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header watchlist={watchlist}/>
      {movies === null || loading ? <Loading/> : (

      <Routes>
        <Route path='/' element={<Main movies={movies} getMovieBySearch={getMovieBySearch} fetched={fetched} setFetched={setFetched}/>} />
        <Route path='/movie/:id' element={<Info/>} />
        <Route path="/watchlist" element={<Watchlist Watchlist={watchlist} fetched={fetched} setFetched={setFetched}/>}/>
        <Route path="/actor/:id" element={<Actor/>}/>

        
      </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;

