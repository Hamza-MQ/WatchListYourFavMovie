
import styled from 'styled-components';
import {RiDeleteBin5Fill} from 'react-icons/ri'
import { useState } from 'react';

const Watchlist = ({Watchlist, setFetched, fetched}) => {

    let [loading, setLoading] = useState(false)

    const handleDelete = async(id) => {
        setLoading(true)
        fetch(`/watchlist/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setFetched(!fetched)
                setLoading(false)
            })
            .catch((error) => {
                window.alert(error);
            })
    }
    const handleUpdate = async(mov) => {
        setLoading(true)
        fetch(`/watchlist`, {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({...mov, status: mov.status === "Watch Now" ? "Watching":"Watch Now"})

        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
                setFetched(!fetched)
                setLoading(false)
            })
            .catch((error) => {
                window.alert(error);
            })
    }

    return (
        <Container>
           {Watchlist === null || loading? <h1>Loading</h1> : Watchlist.data.map(el => {
                    return(
                        <div className="movie">
                            <img src={el.image} alt="" />
                            <h3>{el.title}</h3>
                            <button onClick={() => handleUpdate(el)}>{el.status}</button>
                            <button onClick = {() => handleDelete(el.id)}><RiDeleteBin5Fill/></button>
                        </div>
                    )
           })}
        </Container>
    );
}

const Container = styled.div`
  background: var(--color-selective-yellow);
  align-items: center;
  justify-content:flex-start;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 150px);
  overflow: scroll;
  color: black;
  .movie{
    margin: 10px;
    width: 80%;
    border: var(--color-cadmium-red) 5px solid;
    border-radius:20px;
    padding: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img{
        width: 100px;
        
    }
    h3{
        width: 300px;
    }
    button{
        background-color: var(--color-cadmium-red);
        font-size: 16px;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
    }
  }
`;

export default Watchlist;
