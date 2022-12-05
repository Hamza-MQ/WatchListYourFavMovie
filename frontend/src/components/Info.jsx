import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import styled from 'styled-components';


const Info = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const getMovie = async () => {
        let res = await fetch(`/movie/${id}`)
        let data = await res.json()
        setMovie(data)
    }
    useEffect(() => {
        getMovie()

    }, []);


    return (
        <>
            {movie === null ? <Container><h1>Loading</h1></Container> : (
                <Container>
                    <div className="left">
                        <img src={movie.image} alt="" />
                        {console.log(movie)}
                    </div>
                    <div className="right">
                        <h2>Title : {movie.title}</h2>
                        <p>Release Year : {movie.year}</p>
                        <p>Language : {movie.languages}</p>
                        <p>Genres: {movie.genres}</p>
                        <p>Plot : {movie.plot}</p>
                        <p>Writers: {movie.writers}</p>
                    </div>
                    <div className="down">
                        {movie.actorList.map(actor => {
                            return (
                                <div className="actor">
                                    <img src={actor.image} alt="actor" />
                                    <Link className='link' to={`/actor/${actor.id}`}>{actor.name}</Link>
                                </div>
                            )
                        })}
                    </div>
                </Container>
            )}

        </>
    )


}

const Container = styled.div`
    background-color: var(--color-selective-yellow);
    width: 90vw;
    margin: 20px auto;
    height: 75vh;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    .left{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        height: 60%;
        img{
            width: 70%;
            height: 70%;
        
        }
    }

    .right {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        width: 50%;
        padding: 20% 0;
        height: 60%;
        text-align: left;
        color: var(--color-albama-crimson);
        h2{
            text-align: left;
            color: var(--color-cadmium-red);
        }
        p{
            margin: 20px;
        }
    }

    .down {
        width: 90%;
        
        height: 30%;
        margin: 0 auto;
        overflow: scroll;
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        top:-10%;
        img{
            width: 50px;
            height: 50px;
            border-radius:50%;
        }
        .actor {
            background-color: var(--color-cadmium-red);
            color: var(--color-selective-yellow);
            display: flex;
            flex-direction: column;
            padding: 10px 30px;
            height: 100px;
            align-items: center;
            justify-content: space-around;
            box-sizing: content-box;
            margin: 10px;
            .link {
                text-decoration:none;
                color: yellow;
                cursor: pointer;
            }
            
        }
    }
`
export default Info;
