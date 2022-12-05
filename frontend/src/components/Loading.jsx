import React from 'react';
import styled from 'styled-components';

const Loading = () => {
    return (
        <Container>
            <h1>Loading</h1>
        </Container>
    );
}


const Container = styled.div`
  background: var(--color-selective-yellow);
  align-items: center;
  justify-content:space-around ;
  display: flex;
  flex-wrap: wrap;
  height: calc(100vh - 150px);
  overflow: scroll;
`;
export default Loading;
