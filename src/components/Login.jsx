// import React from 'react';
// import styled from 'styled-components';

// export default function Login() {

//     const handleCLick = () => {
//         const clientId = "f4a151fe857e45a9b788201b0f9cb173";
//         const redirectUrl = "https://spotify-clone-murex-eight-39.vercel.app/";
//         const apiUrl = "https://accounts.spotify.com/authorize";
//         const scope = [
//             "user-read-email",
//             "user-read-private",
//             // "user-personalized",
//             "user-read-playback-state",
//             "user-modify-playback-state",
//             "user-read-currently-playing",
//             "user-read-playback-position",
//             "user-top-read",
//             "user-read-recently-played",
//         ];
//         window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`;


//     }

//     return (
//         <Container>
//             <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png" alt="spotify" />

//             <button onClick={handleCLick}>Connect Spotify</button>
//         </Container>
//     );
// }

// const Container = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     height: 100vh;
//     width: calc(100vw - 12px);
//     background-color:rgb(164, 99, 239);
//     gap: 5rem;
//     img{
//     height: 20vh;
//     }
//     button{
//     padding: 1rem 5rem;
//     border-radius: 5rem;
//     border: none;
//     background-color: black;
//     color: rgb(164, 99, 239);
//     font-size: 1.4rem;
//     cursor: pointer;
//     }

// `;
// src/components/Login.jsx
import React from "react";
import styled from "styled-components";

function generateCodeVerifier(length = 128) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  let codeVerifier = "";
  for (let i = 0; i < length; i++) {
    codeVerifier += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return codeVerifier;
}

async function generateCodeChallenge(codeVerifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export default function Login() {
  const handleClick = async () => {
    const clientId = "f4a151fe857e45a9b788201b0f9cb173";
    const redirectUri = "https://spotify-clone-murex-eight-39.vercel.app/callback"; // ⬅️ Page to handle access token
    const scope = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    localStorage.setItem("code_verifier", codeVerifier);

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope.join(" "))}&code_challenge_method=S256&code_challenge=${codeChallenge}`;

    window.location.href = authUrl;
  };

  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_Black.png"
        alt="spotify"
      />
      <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: calc(100vw - 12px);
  background-color: rgb(164, 99, 239);
  gap: 5rem;

  img {
    height: 20vh;
  }

  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    border: none;
    background-color: black;
    color: rgb(164, 99, 239);
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
