// import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

const Header = ({ watchlist}) => {

  

    // useEffect(() => {
    //     // TODO: GET all flight numbers
    //     fetch("/api/get-flights")
    //     .then(res => res.json())
    //     .then((data) => {
    //         if(data.status === 201){
    //             setFlightNumbers(data.data)
    //         }else{
    //             console.log("not found")
    //         }
    //     })
    // }, []);

    return (
        <Wrapper>
            <Container>
                <Link className="link" to="/">
                    <Logo>MOVIEW</Logo>
                </Link>
            </Container>
            <Nav>
                <>
                    <div className="bubble">{watchlist ? watchlist.data.length : 0}</div>
                    <StyledNavLink to="/watchlist">Watchlist</StyledNavLink>
                </>
            </Nav>
        </Wrapper>
    )
};

const Container = styled.div`
    display: flex;
    align-items: center;

    .link{
        text-decoration:none;
 
    }

`;


const Wrapper = styled.header`
    display: flex;
    justify-content: space-between;
    background: var(--color-alabama-crimson);
    height: 150px;
    align-items: center;
    padding: var(--padding-page) 18px;
`;
const Logo = styled.h1`
`;
const Nav = styled.nav`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .bubble {
        background-color: var(--color-selective-yellow);
        padding: 12px;
        border-radius: 5px;
    }
`;
const StyledNavLink = styled(NavLink)`
    background: var(--color-selective-yellow);
    border: 1px solid transparent;
    border-radius: 4px;
    color: var(--color-alabama-crimson);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--font-heading);
    font-size: 18px;
    height: 42px;
    margin: 0 0 0 8px;
    padding: 0 14px;
    width: 100%;
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

export default Header;
