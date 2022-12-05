import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Actor = () => {

    const { id } = useParams()

    const [actor, setActor] = useState(null)
    const getActor = async () => {
        let res = await fetch(`/actor/${id}`)
        let data = await res.json()
        setActor(data)
    }
    useEffect(() => {
        getActor()

    }, []);


    return (
        <>
            {actor === null ? <Container><h1>Loading</h1></Container> : (


                <Container>
                    <div className="left">
                        <img src={actor.image} alt="" />
                    </div>
                    <div className="right">
                        <h2>Title : {actor.name}</h2>
                        <p>Roles : {actor.role}</p>
                        <p>Birth Date : {actor.birthDate}</p>
                        <p>Awards : {actor.awards}</p>
                        <p>Description : {actor.summary}</p>
                    </div>
                </Container>
            )}

        </>
    );

}


const Container = styled.div`
    background-color: var(--color-selective-yellow);
    width: 90vw;
    margin: 20px auto;
    height: 75vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    .left{
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
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

   
`


export default Actor;
