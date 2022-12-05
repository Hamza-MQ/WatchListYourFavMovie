import React, { useState } from 'react';
import styled from 'styled-components';
import MovieCard from './MovieCard';

const Main = ({movies, getMovieBySearch, fetched, setFetched}) => {
    const [search, setSearch] = useState()


    const handleClick = () => {
        getMovieBySearch(search)
    }
    

    return (
        <Container>
            <Search>
                <input type="text" onChange={(e) =>setSearch(e.target.value)} value={search}/>
                <button onClick={handleClick}>Search</button>
            </Search>
            {movies && movies.map(movie => <MovieCard movie={movie} fetched={fetched} setFetched={setFetched}/>)}
        </Container>
    );
}

const Container = styled.div`
  background: white;
  align-items: center;
  justify-content:space-around ;
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 150px);
  overflow: scroll;
`;

const Search = styled.div`
    width: 100vw;
    display: flex;
    justify-content: space-around;
    padding: 1rem 4rem;
    input{
        width: 500px;
    }
    button{
        background-color: var(--color-cadmium-red);
        padding: 0.5rem 1rem;
        color: var(--color-selective-yellow);
        :hover {
            color: var(--color-cadmium-red);
            background-color: var(--color-selective-yellow);
        }
    }

`
export default Main;
