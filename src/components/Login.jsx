import React from 'react';
import styled from 'styled-components';

export default function Login() {
    return (
        <Container>
            <img src="Spotify.png" alt="spotify" />
            <button>Connect Spotify</button>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color:rgb(164, 99, 239);
    gap: 5rem;
    img{
    height: 20vh;
    }
    button{
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: rgb(164, 99, 239);
    font-size: 1.4rem;
    }

`;