// import React from "react";
// import styled from "styled-components";

// export default function Login() {
//   const handleClick = async () => {
//     const client_id = "f4a151fe857e45a9b788201b0f9cb173";
//     const redirect_uri = "https://spotify-clone-murex-eight-39.vercel.app/";
//     const api_uri = "https://accounts.spotify.com/authorize";
//     const scope = [
//       "user-read-private",
//       "user-read-email",
//       "user-modify-playback-state",
//       "user-read-playback-state",
//       "user-read-currently-playing",
//       "user-read-recently-played",
//       "user-top-read",
//     ];
//     window.location.href = `${api_uri}?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope.join(
//   " "
// )}&response_type=token&show_dialog=true`;


//   };
//   return (
//     <Container>
//       <img
//         src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
//         alt="spotify"
//       />
//       <button onClick={handleClick}>Connect Spotify</button>
//     </Container>
//   );
// }

// const Container = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   height: 100vh;
//   width: 100vw;
//   background-color: #1db954;
//   gap: 5rem;
//   img {
//     height: 20vh;
//   }
//   button {
//     padding: 1rem 5rem;
//     border-radius: 5rem;
//     background-color: black;
//     color: #49f585;
//     border: none;
//     font-size: 1.4rem;
//     cursor: pointer;
//   }
// `;
// src/components/Login.jsx
import React from "react";
import styled from "styled-components";

export default function Login() {
  const generateCodeVerifier = (length = 128) => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    let codeVerifier = "";
    for (let i = 0; i < length; i++) {
      codeVerifier += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return codeVerifier;
  };

  const generateCodeChallenge = async (verifier) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  };

  const handleClick = async () => {
    const client_id = "f4a151fe857e45a9b788201b0f9cb173";
    const redirect_uri = "https://spotify-clone-murex-eight-39.vercel.app/";
    const scope = [
      "user-read-private",
      "user-read-email",
      "playlist-read-collaborative",
      "playlist-read-private",
      "user-modify-playback-state",
      "user-read-playback-state",
      "user-read-currently-playing",
      "user-read-recently-played",
      "user-top-read",
    ].join(" ");

    const codeVerifier = generateCodeVerifier();
    localStorage.setItem("code_verifier", codeVerifier);

    const codeChallenge = await generateCodeChallenge(codeVerifier);
const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirect_uri)}&code_challenge_method=S256&code_challenge=${code_challenge}`;


    window.location.href = authUrl;
  };

  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Black.png"
        alt="spotify"
      />
      <button onClick={handleClick}>Connect Spotify</button>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;
  img {
    height: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border-radius: 5rem;
    background-color: black;
    color: #49f585;
    border: none;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;
