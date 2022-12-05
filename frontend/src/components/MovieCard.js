import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { BsCheckCircleFill, BsFillPlusCircleFill } from 'react-icons/bs'


const MovieCard = ({ movie, fetched, setFetched }) => {
    const [added, setAdded] = useState(false)

    const addToWatchList = async () => {
        let mov = {
            id: movie.id,
            title: movie.title,
            image: movie.image,
            status: "Watch Now"
        }
        fetch("/watchlist", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mov)
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setAdded(true)
                setFetched(!fetched)
            })
            .catch((error) => {
                window.alert(error);
            })
    }
    return (
        <Card>
            <img src={movie.image} alt={movie.title} />
            <div className="info">
                <p>{movie.title}</p>
                <p>Rank : {movie.rank}</p>

                <div className="btns">
                    <StyledNavLink to={`/movie/${movie.id}`}>Get Info</StyledNavLink>
                    <button onClick={addToWatchList}>{added ? <BsCheckCircleFill fill='green' /> : <BsFillPlusCircleFill fill='black' />}</button>
                </div>
            </div>
        </Card>
    );
}


const Card = styled.div`
  width: 200px;
  height: 300px;
  background: var(--color-selective-yellow);
  display: flex;
  flex-direction: column;
  align-items:center ;
  justify-content: space-around;
  box-sizing: border-box;
  margin: 1rem;
  img{
    width: 150px;
    height: 150px;
  }
  .info{
    width: 150px;
    display: flex;
    flex-wrap:wrap;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    text-align: left;
    font-size: 0.5rem;
    padding: 1rem;

    .btns {
        margin-top:10px;
        display: flex;
        justify-content: space-between;
        width: 130px;
   
        align-items: center;
        button {
            background-color: var(--color-selective-yellow);
            display: flex;
            justify-content: center;
            cursor: pointer;
           
        }
    }
    
    p{
       width: 150px;
       font-size: 12px;
       margin: 5px;
       color: var(--color-cadmium-red);
       font-weight:bold;
    }
  }
`;

const StyledNavLink = styled(NavLink)`
    color: var(--color-selective-yellow);
    border: 1px solid transparent;
    border-radius: 4px;
    background: var(--color-alabama-crimson);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-heading);
    font-size: 14px;
    height: 30px;
  
    padding: 0 10px;
    width: 70%;
    text-decoration: none;
    transition: all ease 400ms;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    &:hover {
        background: var(--color-alabama-crimson);
        color: var(--color-selective-yellow);
        border-color: var(--color-selective-yellow);
    }
`;


export default MovieCard;
